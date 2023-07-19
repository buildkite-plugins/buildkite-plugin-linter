/* eslint-env mocha */

const assert = require('chai').assert
const path = require('path')
const fs = require('fs-extra')
const tap = require('tap')

const fixtures = path.join(__dirname, 'readme-version-number-linter')
const linter = require('../lib/linters/readme-version-number-linter')

// The fixtures are checked as git repos, and then renamed from .git to git so
// they can be checked in. This just reverses the renames so we can use them as
// standalone git repos.
function initGitFixture (dir) {
  fs.copySync(path.join(dir, 'git'), path.join(dir, '.git'))
  return dir
}

describe('readme-version-number-linter', () => {
  describe('readme with current version numbers', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'up-to-date',
        path: initGitFixture(path.join(fixtures, 'up-to-date')),
        readme: 'README.md',
        silent: true
      }, tap))
    })
  })
  describe('readme with higher version numbers', () => {
    it('should be valid', async () => {
      assert(await linter({
        id: 'future-version',
        path: initGitFixture(path.join(fixtures, 'future-version')),
        readme: 'README.md',
        silent: true
      }, tap))
    })
  })
  describe('custom readme with current version numbers', () => {
    it('should be valid', async () => {
      assert(linter({
        id: 'custom-readme',
        path: initGitFixture(path.join(fixtures, 'custom-readme')),
        readme: 'custom-readme.md',
        silent: true
      }, tap))
    })
  })
  describe('readme with out of date version numbers', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        id: 'out-of-date',
        path: initGitFixture(path.join(fixtures, 'out-of-date')),
        readme: 'README.md',
        silent: true
      }, tap))
    })
  })
  describe('readme with out of date version numbers and no v prefix', () => {
    it('should be invalid', async () => {
      assert.isFalse(await linter({
        id: 'out-of-date',
        path: initGitFixture(path.join(fixtures, 'out-of-date')),
        readme: 'README-No-Version.md',
        silent: true
      }, tap))
    })
  })
  describe('readme withan invalid version number', () => {
    it('should ignore the invalid', async () => {
      assert(await linter({
        id: 'invalid-sem-ver-tags',
        path: initGitFixture(path.join(fixtures, 'invalid-sem-ver-tags')),
        readme: 'README.md',
        silent: true
      }, tap))
    })
  })
})
