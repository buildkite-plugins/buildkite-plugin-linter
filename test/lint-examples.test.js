const assert = require('chai').assert
const lintExamples = require('../lib/linters/lint-examples')
const path = require('path')
const fixtures = path.join(__dirname, 'lint-examples')

describe('lint-examples', () => {
  describe('valid example', () => {
    it('should be valid', () => {
      assert(lintExamples('valid-plugin', path.join(fixtures, 'valid-plugin'), {
        silent: true,
        readme: 'README.md'
      }))
    })
  })
  describe('valid plugin with yaml instead of yml', () => {
    it('should be valid', () => {
      assert(lintExamples('valid-plugin-with-yaml', path.join(fixtures, 'valid-plugin-with-yaml'), {
        silent: true,
        readme: 'README.md'
      }))
    })
  })
  describe('invalid examples', () => {
    it('should be invalid', () => {
      assert(!lintExamples('invalid-examples', path.join(fixtures, 'invalid-examples'), {
        silent: true,
        readme: 'README.md'
      }))
    })
  })
  describe('custom readme paths', () => {
    it('should work', () => {
      assert(lintExamples('custom-readme', path.join(fixtures, 'custom-readme'), {
        silent: true,
        readme: 'custom-readme.md'
      }))
    })
  })
  describe('skips validation if missing .schema', () => {
    it('should work', () => {
      assert(lintExamples('missing-schema', path.join(fixtures, 'missing-schema'), {
        silent: true,
        readme: 'README.md'
      }))
    })
  })
})