/* eslint-env mocha */

const assert = require('chai').assert
const linter = require('../lib/linters/example-linter')
const path = require('path')
const fixtures = path.join(__dirname, 'example-linter')
const tap = require('tap')

describe('example-linter', () => {
  describe('valid example', () => {
    it('should be valid', async () => {
      assert(await linter({
        name: 'valid-plugin',
        path: path.join(fixtures, 'valid-plugin'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('valid plugin with yaml instead of yml', () => {
    it('should be valid', async () => {
      assert(await linter({
        name: 'valid-plugin-with-yaml',
        path: path.join(fixtures, 'valid-plugin-with-yaml'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('invalid examples', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        name: 'invalid-examples',
        path: path.join(fixtures, 'invalid-examples'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
  describe('custom readme paths', () => {
    it('should work', async () => {
      assert(await linter({
        name: 'custom-readme',
        path: path.join(fixtures, 'custom-readme'),
        silent: true,
        readme: 'custom-readme.md'
      }, tap))
    })
  })
  describe('skips validation if missing .configuration', () => {
    it('should work', async () => {
      assert(await linter({
        name: 'missing-configuration',
        path: path.join(fixtures, 'missing-configuration'),
        silent: true,
        readme: 'README.md'
      }, tap))
    })
  })
})
