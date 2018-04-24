const path = require('path')
const fs = require('fs')
const pluginYamlParser = require('../plugin-yaml')
const yaml = require('js-yaml')
const Ajv = require('ajv')

module.exports = function(pluginName, pluginPath, options) {
  const pluginYaml = pluginYamlParser(pluginPath)
  const silent = options.silent

  const ajv = new Ajv({ allErrors: true, jsonPointers: true })

  const schema = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'plugin-yaml-schema.yml'), 'utf8'))

  const validator = ajv.compile(schema)

  const valid = validator(pluginYaml)

  if (!valid && !silent) {
    console.log("🚨 plugin.yml is invalid:")
    console.log(pluginYaml)
    console.log(validator.errors)
  }

  return valid
}