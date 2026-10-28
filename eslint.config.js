// @ts-check
/* eslint perfectionist/sort-objects: "error" */
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    pnpm: true,
  },
  {
    // Code samples inside posts keep the formatting they were published with
    files: ['**/*.md/**'],
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
