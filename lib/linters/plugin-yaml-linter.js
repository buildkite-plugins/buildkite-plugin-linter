import { Ajv } from 'ajv'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { join } from 'path'

import pluginYamlParser from '../plugin-yaml.js'

export default async function (argv, tap) {
  const { path: pluginPath, silent } = argv
  const pluginYaml = pluginYamlParser(pluginPath)
  const ajv = new Ajv({ allErrors: true, strictTypes: false, jsonPropertySyntax: true })
  const __dirname = import.meta.dirname
  const schema = load(readFileSync(join(__dirname, '..', 'plugin-yaml-schema.yml'), 'utf8'))
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
