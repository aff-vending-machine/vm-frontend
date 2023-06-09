/** @type {import('prettier').Config} **/
module.exports = {
  arrowParens: 'avoid',
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  rangeStart: 0,
  proseWrap: "preserve",
  requirePragma: false,
  insertPragma: false,
  plugins: [
    "prettier-plugin-svelte",
    // "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss"
  ],
  pluginSearchDirs: false
};