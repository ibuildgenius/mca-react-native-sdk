# MCA React Native SDK

Our React Native SDK powered by the mycover.ai platform, for buying and managing insurance policies.

### Installation

```bash 
npm install --save @mycoverai/mca-react-native-sdk
npm install --dev react-native-svg-transformer
```

### Create or Update metro.config.js & paste the following

``` 
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer')

module.exports = config;
```

### Usage

1. import the package into your js file

```javascript
import McaSDK from "mca-react-native-sdk"
```

2. proceed to call the Mycover.ai component in your file

```javascript

 <McaSDK apiKey="<YOUR-MCA-API-KEY>" onComplete={} />
```
