module.exports = {
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'keyword-spacing': 'off',
  },
};
