'use strict'

/**
 * semantic-release configuration
 *
 * Trigger logic (Conventional Commits → SemVer):
 *   feat:            minor bump  (1.0.0 → 1.1.0)
 *   fix:             patch bump  (1.0.0 → 1.0.1)
 *   perf:            patch bump
 *   BREAKING CHANGE: major bump  (1.0.0 → 2.0.0)
 *   chore/docs/test: NO release
 *
 * On release:
 *   1. Bump package.json version
 *   2. Generate/update CHANGELOG.md
 *   3. Create git tag (v1.2.3)
 *   4. Create GitHub Release with changelog notes
 *   5. Publish to npm
 */
module.exports = {
  branches: ['main'],

  plugins: [
    // 1. Analyze commit messages to determine the next version
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'revert', release: 'patch' },
          { type: 'build', release: false },
          { type: 'chore', release: false },
          { type: 'ci', release: false },
          { type: 'docs', release: false },
          { type: 'refactor', release: false },
          { type: 'style', release: false },
          { type: 'test', release: false },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],

    // 2. Generate CHANGELOG.md entries
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: '✨ Features' },
            { type: 'fix', section: '🐛 Bug Fixes' },
            { type: 'perf', section: '⚡ Performance' },
            { type: 'revert', section: '⏪ Reverts' },
            { type: 'docs', section: '📖 Documentation', hidden: false },
            { type: 'refactor', section: '♻️ Refactoring', hidden: true },
          ],
        },
      },
    ],

    // 3. Update CHANGELOG.md on disk
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle:
          '# Changelog\n\nAll notable changes to `braintree-vue3` are documented here.\n',
      },
    ],

    // 4. Run the build before publishing
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'npm run build',
      },
    ],

    // 5. Publish to npm
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: 'dist',
      },
    ],

    // 6. Commit the updated package.json + CHANGELOG.md back to the repo
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],

    // 7. Create a GitHub Release
    '@semantic-release/github',
  ],
}
