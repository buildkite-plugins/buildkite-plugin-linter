const path = require('path')
const util = require('util')
const fs = require('fs')
const pluginYamlParser = require('../plugin-yaml')
const yaml = require('js-yaml')
const Ajv = require('ajv')

module.exports = async function(argv, tap) {
  const { name, path: pluginPath, silent } = argv

  const pluginYaml = pluginYamlParser(pluginPath)

  const ajv = new Ajv({ allErrors: true, jsonPointers: true })

  const schema = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'plugin-yaml-schema.yml'), 'utf8'))

  const validator = ajv.compile(schema)

  const valid = validator(pluginYaml)

  if (!valid) {
    if (!silent) {
      tap.fail(`plugin.yml fails schema validation`, {
        errors: validator.errors,
        at: false,
        stack: false
      })
    }
    return false
  } else {
    if (!silent) {
      tap.pass(`plugin.yml is valid`)
    }
    return true
  }
}