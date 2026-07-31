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

  // Deliberately undefined rather than {}, so that parsing one of our own
  // files down to nothing fails loudly instead of validating everything
  describe('empty documents', () => {
    it('returns undefined for an empty string', () => {
      assert.isUndefined(loadYaml(''))
    })

    it('returns undefined for whitespace only', () => {
      assert.isUndefined(loadYaml('   \n\n'))
    })

    it('returns undefined for comments only', () => {
      assert.isUndefined(loadYaml('# nothing to see here\n'))
    })

    it('returns null for a bare document marker', () => {
      assert.isNull(loadYaml('---\n'))
    })
  })

  // The loader deliberately sticks to YAML 1.2 core resolution rather than
  // YAML11_SCHEMA, so these are the trade-offs we accepted
  describe('yaml 1.2 core resolution', () => {
    it('leaves a bare date as a string', () => {
      // v4 built a Date, which never satisfied an Ajv `type: string`
      assert.strictEqual(loadYaml('when: 2026-07-30\n').when, '2026-07-30')
    })

    it('throws on yaml 1.1 tags outside the core schema', () => {
      assert.throws(() => loadYaml('!!set { a, b }\n'), /unknown mapping tag/)
    })
  })

  describe('invalid input', () => {
    it('throws on a syntax error', () => {
      assert.throws(() => loadYaml('steps:\n\t- command: test\n'), /tab characters/)
    })

    it('throws on more than one document', () => {
      assert.throws(() => loadYaml('steps: []\n---\nsteps: []\n'), /expected a single document/)
    })
  })
})
