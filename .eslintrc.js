const isProductionEnv = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'airbnb-base'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue'],
      },
    },
  },
  rules: {
    'no-console': isProductionEnv ? 'warn' : 'off',
    'no-debugger': isProductionEnv ? 'warn' : 'off',
    'no-param-reassign': ['error', { props: false }],
    'object-curly-newline': ['error', { consistent: true }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
  },
};
