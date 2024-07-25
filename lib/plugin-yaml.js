import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { join } from 'path'

export default function (pluginPath) {
  const yamlPath = join(pluginPath, 'plugin.yml')

  return load(readFileSync(yamlPath, 'utf8'))
}
