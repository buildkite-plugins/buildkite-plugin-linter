const fs = require('fs')
const path = require('path')
const Ajv = require('ajv')
const yaml = require('js-yaml')
const pluginYamlParser = require('../plugin-yaml')

module.exports = async function (argv, tap) {
  const { id, path: pluginPath, readme, silent } = argv

  const readmePath = path.join(pluginPath, readme)

  const readmeContents = fs.readFileSync(readmePath, 'utf8')
  const pluginYaml = pluginYamlParser(pluginPath)

  if (!pluginYaml.configuration) {
    if (!silent) {
      tap.pass('Skipping example validation due to missing .configuration key', 'SKIP')
    }
    return true
  }

  const ajv = new Ajv({ allErrors: true, strictTypes: false, jsonPropertySyntax: true })
  const validator = ajv.compile(pluginYaml.configuration)

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
      tap.fail(`No readme config examples found with plugin id '${id}'. Have you configured the linter with the correct plugin id?`, {
        at: false,
        stack: false
      })
    }
    return false
  } else if (invalidConfigs.length) {
    if (!silent) {
      tap.fail(`Some readme config examples for plugin id '${id}' are invalid`, {
        'invalid configs': invalidConfigs,
        at: false
      })
    }
    return false
  } else {
    if (!silent) {
      tap.pass(`All the readme config examples for plugin id '${id}' are valid (${validConfigs.length} found)`)
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
    const pluginPattern = isLocalPlugin(id) ? `${id}(#.+)?` : `${id}#v.+`
    const pluginRegexp = new RegExp(pluginPattern)
    const pluginStepConfigRegexp = new RegExp(`^${pluginPattern}$`)

    // Ignore any YAML examples that don't mention the plugin
    if (!pluginRegexp.test(exampleYaml)) {
      return []
    }    

    const example = yaml.safeLoad(exampleYaml)

    // Some readmes leave off the "steps" key and jump right into an array of
    // commands. In that case, we use the whole example.
    let steps = example.steps || example

    // Some examples nest their steps under a group step in which case we lint
    // the steps _inside_ the group step
    steps = steps.flatMap((step) => step.group && step.steps || step)

    const configs = []

    // Flatten group steps before processing
    steps.forEach((step) => {
      if (step.plugins) {
        // The old plugins syntax was to use a map, but the new one is an Array.
        // We fail on anything other than array now.
        if (!(step.plugins instanceof Array)) {
          tap.fail(`Plugins list should be an array, not a map`, {
            example: example,
            at: false,
            stack: false
          })
        }

        (step.plugins).forEach(pluginMap => {
          if (typeof pluginMap === "string" && pluginStepConfigRegexp.test(pluginMap)) {
            configs.push(null)
            return
          }
          Object.entries(pluginMap).forEach(([ key, config ]) => {
            if (pluginStepConfigRegexp.test(key)) {
              configs.push(config)
            }
          })
        })
      }
    })

    return configs
  }

  /**
   * Whether the given plugin identifier denotes a local plugin
   *
   * @param {string} id The plugin identifier
   */
  function isLocalPlugin(id) {
    return id.startsWith('/') || id.startsWith('./') || id.startsWith('~/');
  }
}
