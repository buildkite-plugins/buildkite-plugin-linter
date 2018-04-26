const assert = require('chai').assert
const linter = require('../lib/linters/plugin-yaml-linter')
const path = require('path')
const fixtures = path.join(__dirname, 'plugin-yaml-linter')

describe('plugin-yaml-linter', () => {
  describe('valid plugin', () => {
    it('should be valid', async () => {
      assert(await linter({
        name: 'valid-plugin',
        path: path.join(fixtures, 'valid-plugin'),
        silent: true
      }))
    })
  })
  describe('missing name', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        name: 'missing-name',
        path: path.join(fixtures, 'missing-name'),
        silent: true
      }))
    })
  })
  describe('missing description', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        name: 'missing-description',
        path: path.join(fixtures, 'missing-description'),
        silent: true
      }))
    })
  })
  describe('missing author', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        name: 'missing-author',
        path: path.join(fixtures, 'missing-author'),
        silent: true
      }))
    })
  })
  describe('missing requirements', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        name: 'missing-requirements',
        path: path.join(fixtures, 'missing-requirements'),
        silent: true
      }))
    })
  })
  describe('missing configuration', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        name: 'missing-configuration',
        path: path.join(fixtures, 'missing-configuration'),
        silent: true
      }))
    })
  })
})