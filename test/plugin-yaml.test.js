/* eslint-env mocha */

import { assert } from 'chai'
import { join } from 'path'

import pluginYamlParser from '../lib/plugin-yaml.js'

const __dirname = import.meta.dirname
const fixtures = join(__dirname, 'plugin-yaml')

describe('plugin-yaml', () => {
  it('parses a plugin.yml', () => {
    const parsed = pluginYamlParser(join(fixtures, 'valid-plugin'))

    assert.equal(parsed.name, 'A plugin')
    assert.deepEqual(parsed.configuration.properties, { option: { type: 'string' } })
  })

  // an empty file has to reach ajv as {} so it fails on the required keys,
  // rather than as undefined, which ajv happily validates
  it('parses a plugin.yml with no content as an empty object', () => {
    assert.deepEqual(pluginYamlParser(join(fixtures, 'empty-plugin-yml')), {})
  })
})
