const assert = require('chai').assert
const exampleLinter = require('../lib/linters/example-linter')
const path = require('path')
const fixtures = path.join(__dirname, 'example-linter')

describe('lint-examples', () => {
  describe('valid example', () => {
    it('should be valid', () => {
      assert(exampleLinter('valid-plugin', path.join(fixtures, 'valid-plugin'), {
        silent: true,
        readme: 'README.md'
      }))
    })
  })
  describe('valid plugin with yaml instead of yml', () => {
    it('should be valid', () => {
      assert(exampleLinter('valid-plugin-with-yaml', path.join(fixtures, 'valid-plugin-with-yaml'), {
        silent: true,
        readme: 'README.md'
      }))
    })
  })
  describe('invalid examples', () => {
    it('should be invalid', () => {
      assert(!exampleLinter('invalid-examples', path.join(fixtures, 'invalid-examples'), {
        silent: true,
        readme: 'README.md'
      }))
    })
  })
  describe('custom readme paths', () => {
    it('should work', () => {
      assert(exampleLinter('custom-readme', path.join(fixtures, 'custom-readme'), {
        silent: true,
        readme: 'custom-readme.md'
      }))
    })
  })
  describe('skips validation if missing .configuration', () => {
    it('should work', () => {
      assert(exampleLinter('missing-configuration', path.join(fixtures, 'missing-configuration'), {
        silent: true,
        readme: 'README.md'
      }))
    })
  })
})