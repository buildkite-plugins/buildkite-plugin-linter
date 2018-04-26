const path = require('path')
const fs = require('fs')
const git = require('isomorphic-git')
const compareVersions = require('compare-versions')

module.exports = async function(argv) {
  const { name, path: pluginPath, silent, readme } = argv

  const pluginConfigKeyPattern = new RegExp(`${name}#(v.*):`, 'g')

  const readmePath = path.join(pluginPath, readme)
  const readmeContents = fs.readFileSync(readmePath, 'utf8')

  const tags = await git.listTags({fs, dir: pluginPath})
 
  const sortedTags = tags.sort(compareVersions)
  const latestVersion = tags[tags.length - 1];

  if (!silent) {
    console.log(`Tags: ${tags}`)
    console.log(`Latest version: ${latestVersion}`)
  }

  let valid = true
  let match

  while(match = pluginConfigKeyPattern.exec(readmeContents)) {
    const version = match[1];

    if (version !== latestVersion) {
      valid = false
      if (!silent) {
        console.log(`🚨 Version number in readme out of date: ${version}`)
      }
    }
  }

  return valid
}