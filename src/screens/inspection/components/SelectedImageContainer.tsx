import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CustomColors } from '../../../constants/CustomColors';

interface SelectedImageContainerProps {
  imageFile: string | null;
  aspectRatio: number;
  height?: number;
  width?: number;
}

const SelectedImageContainer: React.FC<SelectedImageContainerProps> = ({
  imageFile,
  aspectRatio,
  height,
  width,
}) => {
  if (!imageFile) {
    return null; // Handle case where imageFile is null
  }

  return (
    <View style={[styles.container, { height, width }]}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageFile }}
          style={[styles.image, { aspectRatio }]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    borderWidth: 5,
    borderColor: CustomColors.whiteColor,
  },
  image: {
    width: '100%',
    height: 170,
  },
});

export default SelectedImageContainer;
