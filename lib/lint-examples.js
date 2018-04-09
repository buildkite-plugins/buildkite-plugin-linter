const fs = require('fs')
const path = require('path')

const Ajv = require('ajv')
const yaml = require('js-yaml')

module.exports = function(pluginName, pluginPath, options) {
  const readmePath = path.join(pluginPath, options.readme)
  const schemaPath = path.join(pluginPath, 'schema.yml')

  const readme = fs.readFileSync(readmePath, 'utf8')
  const schema = yaml.safeLoad(fs.readFileSync(schemaPath, 'utf8'))

  const ajv = new Ajv({ allErrors: true, jsonPointers: true })
  const validator = ajv.compile(schema)

  const pluginConfigKeyPattern = new RegExp(`^${pluginName}#v.*$`)

  const validConfigs = []
  const invalidConfigs = []

  extractPipelineExamples()
    .forEach((example) => {
      extractPluginConfigs(example)
        .forEach((config) => {
          if (validateConfig(example, config)) {
            validConfigs.push(config)
          } else {
            invalidConfigs.push(config)
          }
        })
    })


  if (!validConfigs.length && !invalidConfigs.length) {
    console.log(`🚨 No example configs found in ${readmePath} with plugin name '${pluginName}'`)
    return false
  } else {
    console.log(`${validConfigs.length} plugin config examples are valid`)
    console.log(`${invalidConfigs.length} invalid plugin config are invalid`)  
    return invalidConfigs.length === 0
  }

  function extractPipelineExamples() {
    const examples = []
    const yamlPattern = /```ya?ml\n+(.*?)\n+```/gs
    while (yamlMatch = yamlPattern.exec(readme)) {
      examples.push(yamlMatch[1])
    }
    return examples 
  }

  function extractPluginConfigs(exampleYaml) {
    const configs = []
    const example = yaml.safeLoad(exampleYaml)
    if (example.steps) {
      example.steps.forEach((step) => {
        if (step.plugins) {
          Object.entries(step.plugins).forEach(([ name, config ]) => {
            if (pluginConfigKeyPattern.exec(name)) {
              configs.push(config)
            }
          })
        }
      })
    }
    return configs
  }

  function validateConfig(fullExample, pluginConfig) {
    const valid = validator(pluginConfig)
    if (!valid) {
      console.log("🚨 Example is invalid:")
      console.log(fullExample)
      console.log(validator.errors)
    }
    return valid
  }
}