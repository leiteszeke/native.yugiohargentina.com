module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '#components': './src/components',
          '#containers': './src/containers',
          '#contexts': './src/contexts',
          '#env': './src/env.js',
          '#helpers': './src/helpers',
          '#hoc': './src/hoc',
          '#hooks': './src/hooks',
          '#images': './src/images',
          '#mocks': './src/mocks',
          '#services': './src/services',
          '#theme': './src/theme.js',
          '#types': './src/types.js',
          '#utils': './src/utils',
        },
      },
    ],
  ],
};
