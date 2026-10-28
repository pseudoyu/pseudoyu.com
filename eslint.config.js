// @ts-check
/* eslint perfectionist/sort-objects: "error" */
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    // Real Telegram markup the daily parser is tested against; keep it byte for byte
    ignores: ['api/daily/_tests/fixtures/**'],
    pnpm: true,
  },
  {
    // This post's code samples keep the formatting they were published with
    files: ['pages/zh/2022/06/09/learn_solidity_from_scratch_hardhat.md/**'],
    rules: {
      'style/indent': 'off',
    },
  },
).removeRules(
  'no-labels',
  'no-lone-blocks',
  'no-restricted-syntax',
  'node/prefer-global/buffer',
  'node/prefer-global/process',
  'prefer-rest-params',
  'symbol-description',
  'ts/ban-types',
  'ts/no-empty-object-type',
  'ts/no-invalid-this',
  'ts/no-unnecessary-type-constraint',
  'vue/no-template-shadow',
  'vue/no-v-text-v-html-on-component',
  'e18e/prefer-static-regex',
  'markdown/heading-increment',
  'markdown/no-missing-atx-heading-space',
  'markdown/require-alt-text',
)
