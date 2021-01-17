module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'babel-plugin-root-import',
      {
        paths: [
          { rootPathSuffix: './src', rootPathPrefix: '~/' },
          {
            rootPathSuffix: './src/components',
            rootPathPrefix: '@components/',
          },
          {
            rootPathSuffix: './src/lib/api',
            rootPathPrefix: '@api/',
          },
          {
            rootPathSuffix: './src/lib/utils',
            rootPathPrefix: '@utils/',
          },
          {
            rootPathSuffix: './src/lib/style',
            rootPathPrefix: '@style/',
          },
          {
            rootPathSuffix: './src/store',
            rootPathPrefix: '@store/',
          },
        ],
      },
    ],
  ],
};
