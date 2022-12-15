const path = require('path')
const fs = require('fs')
const git = require('isomorphic-git')
const { compareVersions, validate } = require('compare-versions')

module.exports = async function (argv, tap) {
  const { id, path: pluginPath, readme, silent } = argv

  const pluginConfigKeyPattern = new RegExp(`${id}#(v.*):`, 'g')

  const readmePath = path.join(pluginPath, readme)
  const readmeContents = fs.readFileSync(readmePath, 'utf8')

  const tags = await git.listTags({ fs, dir: pluginPath })

  const sortedTags = tags.sort((t1, t2) => {
    if (!validate(t1)) { return -1 } // invalid t1 < whatever t2 (makes sort stable)
    if (!validate(t2)) { return 1 } // invalid t2 < valid t1
    return compareVersions(t1, t2) // both are valid, let the module decide
  })

  const latestVersion = sortedTags[sortedTags.length - 1]

  const invalidVersionNumbers = []

  while (true) {
    const match = pluginConfigKeyPattern.exec(readmeContents)
    if (!match) {
      break
    }
    const version = match[1]
    if (version < latestVersion) {
      invalidVersionNumbers.push(version)
    }
  }

  if (!invalidVersionNumbers.length) {
    if (!silent) {
      tap.pass(`Readme version numbers are up-to-date (${latestVersion})`)
    }
    return true
  } else {
    if (!silent) {
      tap.fail(`Readme version numbers out of date. Latest is ${latestVersion}`, {
        'invalid version numbers': invalidVersionNumbers,
        at: false,
        stack: false
      })
    }
    return false
  }
}
