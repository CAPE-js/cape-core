module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],

  rules: {
    'vue/no-mutating-props': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-closing-bracket-spacing': 0
  },

  parserOptions: {
    ecmaVersion: 2022,
    parser: '@typescript-eslint/parser'
  },

  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript'
  ]
}

