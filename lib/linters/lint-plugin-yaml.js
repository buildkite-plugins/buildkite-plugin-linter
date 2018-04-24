const pluginYamlParser = require('../plugin-yaml-parser')
const Ajv = require('ajv')

const schema = require("../plugin-yaml-schema.json")

module.exports = function(pluginName, pluginPath, options) {
  const pluginYaml = pluginYamlParser(pluginPath)
  const silent = options.silent

  const ajv = new Ajv({ allErrors: true, jsonPointers: true })
  const validator = ajv.compile(schema)

  const valid = validator(pluginYaml)

  if (!valid && !silent) {
    console.log("🚨 plugin.yml is invalid:")
    console.log(pluginYaml)
    console.log(validator.errors)
  }

  return valid
}