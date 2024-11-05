import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

interface CustomImageNetworkProps {
  imageUrl: string;
  loaderComponent: React.ReactNode;
  fit?: 'cover' | 'contain' | 'stretch' | 'center';
  height?: number;
}

const CustomImageNetwork: React.FC<CustomImageNetworkProps> = ({
  imageUrl,
  loaderComponent,

  height,
}) => {
  return (
    <View style={{ height }}>
      <FastImage
        source={{ uri: imageUrl }}
        style={[styles.image, { height }]}
        // resizeMode={fit as FastImage.ResizeMode}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={() => loaderComponent}
        onError={() => loaderComponent} // You can customize this with an error component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
});

export default CustomImageNetwork;
