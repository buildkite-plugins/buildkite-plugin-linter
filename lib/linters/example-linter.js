const fs = require('fs')
const path = require('path')
const Ajv = require('ajv')
const yaml = require('js-yaml')
const pluginYamlParser = require('../plugin-yaml')

module.exports = async function (argv, tap) {
  const { name, path: pluginPath, readme, silent } = argv

  const readmePath = path.join(pluginPath, readme)

  const readmeContents = fs.readFileSync(readmePath, 'utf8')
  const pluginYaml = pluginYamlParser(pluginPath)

  if (!pluginYaml.configuration) {
    if (!silent) {
      tap.pass('Skipping example validation due to missing .configuration key', 'SKIP')
    }
    return true
  }

  const ajv = new Ajv({ allErrors: true, jsonPointers: true })
  const validator = ajv.compile(pluginYaml.configuration)

  const pluginConfigKeyPattern = new RegExp(`^${name}#v.*$`)

  const validConfigs = []
  const invalidConfigs = []

  extractPipelineExamples()
    .forEach((example) => {
      extractPluginConfigs(example)
        .forEach((config) => {
          const valid = validator(config)
          if (valid) {
            validConfigs.push(config)
          } else {
            invalidConfigs.push({ config: config, errors: validator.errors })
          }
        })
    })

  if (!validConfigs.length && !invalidConfigs.length) {
    if (!silent) {
      tap.fail(`Readme must have at least one config example`, {
        at: false,
        stack: false
      })
    }
    return false
  } else if (invalidConfigs.length) {
    if (!silent) {
      tap.fail(`Some readme config examples are invalid`, {
        'invalid configs': invalidConfigs,
        at: false
      })
    }
    return false
  } else {
    if (!silent) {
      tap.pass(`Readme config examples are valid (${validConfigs.length} found)`)
    }
    return true
  }

  function extractPipelineExamples () {
    const examples = []
    // This 'dotAll' flag (s) causes eslint/standard to parse error. So we have
    // to ignore the file until eslint gets updated to support it.
    const yamlPattern = /```ya?ml\n+(.*?)\n+```/gs
    while (true) {
      const yamlMatch = yamlPattern.exec(readmeContents)
      if (!yamlMatch) {
        break
      }
      examples.push(yamlMatch[1])
    }
    return examples
  }

  function extractPluginConfigs (exampleYaml) {
    const configs = []
    const example = yaml.safeLoad(exampleYaml)
    let steps = example.steps
    // Some readmes leave off the "steps" key and jump right into an array of
    // commands.
    if (!steps) {
      steps = example
    }
    steps.forEach((step) => {
      if (step.plugins) {
        Object.entries(step.plugins).forEach(([ name, config ]) => {
          if (pluginConfigKeyPattern.exec(name)) {
            configs.push(config)
          }
        })
      }
    })
    return configs
  }
}
