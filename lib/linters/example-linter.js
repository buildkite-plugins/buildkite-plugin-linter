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
            invalidConfigs.push({ config, errors: validator.errors })
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

  /**
   * Whether the given plugin spec matches the provided plugin id
   *
   * @param {string} pluginSpec The plugin spec to test
   * @param {string} id The plugin identifier
   */
  function matchValidPlugin (pluginSpec, id) {
    if (isLocalPlugin(pluginSpec)) {
      // local plugins just need to end with the id, optionally -buildkite-plugin and the hash is ignored
      const pluginRegexp = new RegExp(`${id}(-buildkite-plugin)?(#.+)?$`)
      return pluginRegexp.test(pluginSpec)
    }

    let pluginRef, expectedPath
    try {
      // full URL plugins
      pluginRef = new URL(pluginSpec)
      expectedPath = `/${id}-buildkite-plugin`
    } catch (err) {
      // assume it is just the name, build the URL (almost) and try again
      pluginRef = new URL(`https://github.com/${pluginSpec}`)
      expectedPath = `/${id}`
    }

    return pluginRef.pathname === expectedPath && pluginRef.hash.startsWith('#v')
  }

  function extractPluginConfigs (exampleYaml) {
    const example = yaml.safeLoad(exampleYaml)

    // Some readmes leave off the "steps" key and jump right into an array of
    // commands. In that case, we use the whole example.
    let steps = example.steps || example

    // if not an array, flatMap will fail
    if (!(steps instanceof Array)) {
      steps = [steps]
    }

    // Some examples nest their steps under a group step in which case we lint
    // the steps _inside_ the group step
    steps = steps.flatMap((step) => (step.group && step.steps) || step)

    const configs = []

    // Flatten group steps before processing
    steps.forEach((step) => {
      if (step.plugins) {
        // The old (pre-2019) plugins syntax was to use a map
        // We ignore non-array ones now.
        if (step.plugins instanceof Array) {
          (step.plugins).forEach(pluginMap => {
            if (typeof pluginMap === 'string' && matchValidPlugin(pluginMap, id)) {
              configs.push(null)
              return
            }
            Object.entries(pluginMap).forEach(([key, config]) => {
              if (matchValidPlugin(key, id)) {
                configs.push(config)
              }
            })
          })
        }
      }
    })

    return configs
  }

  /**
   * Whether the given plugin identifier denotes a local plugin
   *
   * @param {string} id The plugin identifier
   */
  function isLocalPlugin (id) {
    return id.startsWith('/') || id.startsWith('./') || id.startsWith('~/')
  }
}
