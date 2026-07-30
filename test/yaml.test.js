/* eslint-env mocha */

import { assert } from 'chai'

import loadYaml from '../lib/yaml.js'

describe('yaml', () => {
  describe('merge keys', () => {
    it('merges an aliased mapping into a step', () => {
      const result = loadYaml(`common: &common
  plugins:
    - example#v1.0.0:
        option: value
steps:
  - <<: *common
`)

      assert.deepEqual(result.steps, [{
        plugins: [{ 'example#v1.0.0': { option: 'value' } }]
      }])
    })

    it('merges an aliased mapping into a plugin config', () => {
      const result = loadYaml(`defaults: &defaults
  option: value
steps:
  - plugins:
      - example#v1.0.0:
          <<: *defaults
          other: thing
`)

      assert.deepEqual(result.steps[0].plugins[0]['example#v1.0.0'], {
        option: 'value',
        other: 'thing'
      })
    })

    it('lets later keys override the merged ones', () => {
      const result = loadYaml(`defaults: &defaults
  option: from-anchor
config:
  <<: *defaults
  option: from-config
`)

      assert.deepEqual(result.config, { option: 'from-config' })
    })
  })

  describe('invalid input', () => {
    it('throws on a syntax error', () => {
      assert.throws(() => loadYaml('steps:\n\t- command: test\n'), /tab characters/)
    })

    it('throws on more than one document', () => {
      assert.throws(() => loadYaml('steps: []\n---\nsteps: []\n'))
    })
  })
})
