const fs = require('fs')
const Ajv = require('ajv')
const yaml = require('js-yaml')

const pluginName = process.env.PLUGIN_NAME || process.argv[2]
const schemaPath = process.env.PLUGIN_SCHEMA || process.argv[3]
const readmePath = process.env.PLUGIN_README || process.argv[4]

if (!pluginName || !schemaPath || !readmePath) {
  throw "Usage: <plugin-name> <schema-path> <readme-path>"
}

const readme = fs.readFileSync(readmePath, 'utf8')
const schema = yaml.safeLoad(fs.readFileSync(schemaPath, 'utf8'))
const ajv = new Ajv({ allErrors: true, jsonPointers: true })
const validator = ajv.compile(schema)

const pluginConfigKeyPattern = new RegExp(`^${pluginName}#v.*$`)

const pluginConfigs = []

extractPipelineExamples()
  .forEach((example) => {
    extractPluginConfigs(example)
      .forEach((config) => {
        pluginConfigs.push(config)
        validateConfig(example, config)
      })
  })

function extractPipelineExamples() {
  const examples = []
  const yamlPattern = /```yml\n+(.*?)\n+```/gs
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
  if (!validator(pluginConfig)) {
    console.log("🚨 Example is invalid:")
    console.log(fullExample)
    console.log(validator.errors)
    process.exitCode = 1
  }
}

if (process.exitCode != 1) {
  console.log(`🙌 All ${pluginConfigs.length} plugin examples are valid`)
}