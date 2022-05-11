module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-tabs":"off",
    "space-before-function-paren": 0,
    "space-before-blocks":0,
    "indent":'off',

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
