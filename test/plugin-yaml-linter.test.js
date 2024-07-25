/* eslint-env mocha */

import { assert } from 'chai'
import { join } from 'path'
import { t as tap } from 'tap'

import linter from '../lib/linters/plugin-yaml-linter.js'

const __dirname = import.meta.dirname
const fixtures = join(__dirname, 'plugin-yaml-linter')

describe('plugin-yaml-linter', () => {
  describe('valid plugin', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-plugin',
        path: join(fixtures, 'valid-plugin'),
        silent: true
      }, tap))
    })
  });

  ['invalid-sub-property',
    'missing-name',
    'missing-description',
    'missing-author',
    'missing-requirements',
    'missing-configuration',
    'missing-configuration-properties'
  ].forEach((invalidCase) => {
    describe(invalidCase, () => {
      it('should be invalid', async () => {
        assert.isFalse(await linter({
          name: invalidCase,
          path: join(fixtures, invalidCase),
          silent: true
        }, tap))
      })
    })
  })
})
