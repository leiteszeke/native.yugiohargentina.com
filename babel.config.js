module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
          '#modules': './src/modules',
          '#services': './src/services',
          '#theme': './src/Theme.ts',
          '#types': './src/types.ts',
          '#utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
