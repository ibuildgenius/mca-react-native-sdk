module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '^views/(.+)': './src/views/\\1',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
  presets: [
    ['module:react-native-builder-bob/babel-preset', { modules: false }],
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
