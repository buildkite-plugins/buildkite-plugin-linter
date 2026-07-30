import { readFileSync } from 'fs'
import { join } from 'path'

import loadYaml from './yaml.js'

export default function (pluginPath) {
  const yamlPath = join(pluginPath, 'plugin.yml')

  return loadYaml(readFileSync(yamlPath, 'utf8'))
}
