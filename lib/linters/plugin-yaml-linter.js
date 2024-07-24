const path = require('path')
const fs = require('fs')
const pluginYamlParser = require('../plugin-yaml')
const yaml = require('js-yaml')
const Ajv = require('ajv')

module.exports = async function (argv, tap) {
  const { path: pluginPath, silent } = argv
  const pluginYaml = pluginYamlParser(pluginPath)
  const ajv = new Ajv({ allErrors: true, strictTypes: false, jsonPropertySyntax: true })
  const schema = yaml.load(fs.readFileSync(path.join(__dirname, '..', 'plugin-yaml-schema.yml'), 'utf8'))
  const validator = ajv.compile(schema)

  let valid = validator(pluginYaml)

  if (!valid) {
    if (!silent) {
      tap.fail('plugin.yml fails schema validation', {
        errors: validator.errors,
        at: false,
        stack: false
      })
    }
  }

  try {
    // validate plugin configuration is a valid schema itself
    const propertyValidator = ajv.compile(pluginYaml.configuration) // eslint-disable-line no-unused-vars
    if (!silent) {
      tap.pass('plugin.yml configuration is valid')
    }
  } catch (error) {
    if (!silent) {
      tap.fail('plugin.yml configuration is not a valid schema', {
        errors: error.message,
        at: false,
        stack: false
      })
    }
    valid = false
  }

  return valid
}
