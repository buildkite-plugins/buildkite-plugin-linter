/* eslint-env mocha */

import { assert } from 'chai'
import { join } from 'path'
import { t as tap } from 'tap'

import linter from '../lib/linters/example-linter.js'

const __dirname = import.meta.dirname;
const fixtures = join(__dirname, 'example-linter')

describe('example-linter', () => {
  describe('valid example', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-plugin',
        path: join(fixtures, 'valid-plugin'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
    it('should be valid without v', async () => {
      assert(await linter({
        id: 'valid-plugin',
        path: join(fixtures, 'valid-plugin'),
        silent: true,
        readme: 'README-with-anything.md'
      }, tap))
    })
  })
  describe('valid plugin with yaml instead of yml', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-plugin-with-yaml',
        path: join(fixtures, 'valid-plugin-with-yaml'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid plugin with zero config', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'zero-config-plugin',
        path: join(fixtures, 'zero-config-plugin'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid plugin with examples with group step', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-example-with-group-step',
        path: join(fixtures, 'valid-example-with-group-step'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid plugin with examples without a steps key', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-example-without-a-steps-key',
        path: join(fixtures, 'valid-example-without-a-steps-key'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid example with ignored yml block', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'valid-example-with-ignored-yml-block',
        path: join(fixtures, 'valid-example-with-ignored-yml-block'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid example with SSH syntax', () => {
    it('should be valid with full url', async () => {
      assert(await linter({
        id: 'ssh://git@github.com/my-org/example-buildkite-plugin',
        path: join(fixtures, 'valid-plugin-with-ssh-syntax'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
    it('should be valid with plugin id', async () => {
      assert(await linter({
        id: 'my-org/example',
        path: join(fixtures, 'valid-plugin-with-ssh-syntax'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('invalid examples', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        id: 'invalid-plugin',
        path: join(fixtures, 'invalid-examples'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
    it('is missing version', async () => {
      assert.isFalse(await linter({
        id: 'missing-version',
        path: join(fixtures, 'missing-version'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('old plugin syntax', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        id: 'valid-plugin',
        path: join(fixtures, 'old-plugins-syntax'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('custom readme paths', () => {
    it('should work', async () => {
      assert(await linter({
        id: 'custom-readme',
        path: join(fixtures, 'custom-readme'),
        silent: true,
        readme: 'custom-readme.md'
      }, tap))
    })
  })
  describe('skips validation if missing .configuration', () => {
    it('should work', async () => {
      assert(await linter({
        id: 'missing-configuration',
        path: join(fixtures, 'missing-configuration'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid local example', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: './test/example-linter/valid-local-plugin',
        path: join(fixtures, 'valid-local-plugin'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
})
