import { readFileSync } from 'fs'
import { join } from 'path'

import loadYaml from './yaml.js'

export default function (pluginPath) {
  const yamlPath = join(pluginPath, 'plugin.yml')

  // an empty plugin.yml should fail schema validation, not abort the lint run
  return loadYaml(readFileSync(yamlPath, 'utf8')) ?? {}
}
