import { compareVersions, validate } from 'compare-versions'
import { listTags } from 'isomorphic-git'
import * as fs from 'fs'
import { join } from 'path'

export default async function (argv, tap) {
  const { id, path: pluginPath, readme, silent, skipInvalid } = argv

  const pluginConfigKeyPattern = new RegExp(`${id}#(v?.*):`, 'g')

  const readmePath = join(pluginPath, readme)
  const readmeContents = fs.readFileSync(readmePath, 'utf8')

  const tags = await listTags({ fs, dir: pluginPath })

  const sortedTags = tags.sort((t1, t2) => {
    if (!validate(t1)) { return -1 } // invalid t1 < whatever t2 (makes sort stable)
    if (!validate(t2)) { return 1 } // invalid t2 < valid t1
    return compareVersions(t1, t2) // both are valid, let the module decide
  })

  const latestVersion = sortedTags.pop()

  if (!validate(latestVersion)) {
    tap.skip('There are no valid tags to compare to')
    return true
  }

  const invalidVersionNumbers = []
  const oldVersionNumbers = []

  while (true) {
    const match = pluginConfigKeyPattern.exec(readmeContents)
    if (!match) {
      break
    }
    const version = match[1]
    if (!validate(version)) {
      invalidVersionNumbers.push(version)
    } else if (compareVersions(version, latestVersion) === -1) {
      oldVersionNumbers.push(version)
    }
  }

  if (oldVersionNumbers.length) {
    if (!silent) {
      tap.fail(`Readme version numbers out of date. Latest is ${latestVersion}`, {
        'outdated version numbers': oldVersionNumbers,
        at: null,
        stack: null
      })
    }
    return false
  } else if (invalidVersionNumbers.length && !skipInvalid) {
    if (!silent) {
      tap.fail('Found some invalid versions.', {
        'invalid version numbers': invalidVersionNumbers,
        at: null,
        stack: null
      })
    }
    return false
  }

  if (!silent) {
    tap.pass(`Readme version numbers are up-to-date (${latestVersion})`)
  }
  return true
}
