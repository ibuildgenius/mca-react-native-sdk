// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// // const defaultConfig = getDefaultConfig(__dirname);
// // const {assetExts, sourceExts} = defaultConfig.resolver;

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(
//       (ext) => ext !== 'svg'
//     ),
//     sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, 'svg'],
//   },
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Retrieve the default configuration
const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    // Filter out 'svg' from assetExts and add to sourceExts
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'ts', 'tsx', 'svg'],
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

////////HEREE OLD
// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// const {
//  resolver: { sourceExts, assetExts },
// } = getDefaultConfig(__dirname);

// const config = {
//  transformer: {
//    getTransformOptions: async () => ({
//      transform: {
//        experimentalImportSupport: false,
//        inlineRequires: true,
//      },
//    }),
//    babelTransformerPath: require.resolve('react-native-svg-transformer'),
//  },
//  resolver: {
//    assetExts: assetExts.filter(ext => ext !== 'svg'),
//    sourceExts: [...sourceExts, 'svg'],
//  },
// };

// module.exports = mergeConfig(defaultConfig, config);
