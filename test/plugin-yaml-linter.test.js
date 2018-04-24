const assert = require('chai').assert
const pluginYamlLinter = require('../lib/linters/plugin-yaml-linter')
const path = require('path')
const fixtures = path.join(__dirname, 'plugin-yaml-linter')

describe('lint-plugin-yaml', () => {
  describe('valid plugin', () => {
    it('should be valid', () => {
      assert(pluginYamlLinter('valid-plugin', path.join(fixtures, 'valid-plugin'), {
        silent: false
      }))
    })
  })
  describe('missing name', () => {
    it('should be invalid', () => {
      assert(!pluginYamlLinter('missing-name', path.join(fixtures, 'missing-name'), {
        silent: true
      }))
    })
  })
  describe('missing description', () => {
    it('should be invalid', () => {
      assert(!pluginYamlLinter('missing-description', path.join(fixtures, 'missing-description'), {
        silent: true
      }))
    })
  })
  describe('missing author', () => {
    it('should be invalid', () => {
      assert(!pluginYamlLinter('missing-author', path.join(fixtures, 'missing-author'), {
        silent: true
      }))
    })
  })
  describe('missing requirements', () => {
    it('should be invalid', () => {
      assert(!pluginYamlLinter('missing-requirements', path.join(fixtures, 'missing-requirements'), {
        silent: true
      }))
    })
  })
  describe('missing configuration', () => {
    it('should be invalid', () => {
      assert(!pluginYamlLinter('missing-configuration', path.join(fixtures, 'missing-configuration'), {
        silent: true
      }))
    })
  })
})