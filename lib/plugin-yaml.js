const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

module.exports = function (pluginPath) {
  const yamlPath = path.join(pluginPath, 'plugin.yml')

  return yaml.safeLoad(fs.readFileSync(yamlPath, 'utf8'))
}
