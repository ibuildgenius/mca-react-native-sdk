# MCA React Native SDK

Our React Native SDK powered by the mycover.ai platform, for buying and managing insurance policies.

### Installation

```bash 
npm install --save @mycoverai/mca-react-native-sdk
npm install --dev react-native-svg-transformer
```

### Create or Update metro.config.js & paste the following

``` 
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

```

### Usage

1. import the package into your js file

```javascript
import McaSDK from "@mycoverai/mca-react-native-sdk"
```

2. proceed to call the Mycover.ai component in your file

```javascript

 <McaSDK apiKey="<YOUR-MCA-API-KEY>" onComplete={() => console.log('done')} />
```
