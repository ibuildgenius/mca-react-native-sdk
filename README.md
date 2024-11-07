# mca-react-native-sdk

Official MyCover.ai SDK. Supercharge your product with MyCover AI Insurance offerings. Create embedded insurance offerings or full white label insurance applications that excite your customers.

## Installation

```sh
    npm i @mycoverai/mca-react-native-sdk
```

## Additional Setup

- To install all necessary dependencies, run:

```sh
npm install mca-react-native-sdk react-native-screens react-native-safe-area-context react-native-svg-transformer @react-native-community/geolocation @react-native-clipboard/clipboard react-native-svg react-native-gesture-handler @react-native-community/datetimepicker @pusher/pusher-websocket-react-native lottie-react-native react-native-image-picker react-native-reanimated react-native-vision-camera react-native-orientation-locker react-native-fs
```

## Create or Update metro.config.js & paste the following

```js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
```

## Create or Update babel.config.js & paste the following

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

## Link the assets in your React Native project:

For React Native >= 0.60, add this to your react-native.config.js:

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['node_modules/mca-react-native-sdk/src/assets/fonts/'],
};
```

And run

```sh
npx react-native-asset
```

## Android Permissions

- In your AndroidManifest.xml, add the following permissions:

```js
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />


```

## Usage

```js
import MyCoverAI from '@mycoverai/mca-react-native-sdk';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const backgroundStyle = {
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <MyCoverAI
        apikey="MCAPUBK_TEST|49303c8b-4fb4-4d8b-a4d3-c2f6f6d0fb62"
        // transactionType="claim"
      />
    </SafeAreaView>
  );
}
```
## Properties

The MyCoverAIProps type defines the properties you can pass into the SDK for configuration:

1. **apikey:**
      - Your API key for authentication. This is required.

2. **policyId (optional):**
      - Required only if transactionType is set to claims or inspection.

3. **policyNumber (optional):**
      - Required only if transactionType is set to claims.

4. **referenceNumber:**
      - Required only if paymentOption is set to wallet.

5. **email (optional):**
      - Required only if transactionType is set to claims.

6. **transactionType:**
      - Type of transaction. Available options:
          - continuePurchase: For continuing a purchase transaction
          - purchase: For a new purchase transaction
          - inspection: For inspections
          - claim: For claims
          - paymentOption:

7. **paymentOption:**
     - wallet: Payment via wallet
     - gateway: Payment via gateway

## Troubleshooting

- If you encounter the following errors:

1. Error: ViewManagerResolver returned null for either RNSScreenStackHeaderConfig or RTCTRNSScreenStackHeaderConfig

   - Fix: npm install react-native-screens

2. Error: ViewManagerResolver returned null for RNCSafeAreaProvider

   - Fix: npm install react-native-safe-area-context

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
