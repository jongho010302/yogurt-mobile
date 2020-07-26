module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'keyword-spacing': 'off'
  }
};
