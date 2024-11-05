import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { HorizontalSpacer } from './Spacer';
import { CustomColors } from '../constants/CustomColors';
import { SemiBoldText } from './CustomText';

const HelpContainer: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <SemiBoldText
            title="Welcome to our help Center"
            fontSize={18}
            color={CustomColors.darkTextColor}
          />
        </View>
        <HorizontalSpacer width={20} />
        <Image
          source={require('../assets/images/headphone.webp')} // Update the path to your image
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 8,
    borderBottomWidth: 0.2,
    borderBottomColor: CustomColors.productBorderColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  image: {
    height: 50,
    width: 50, // If necessary, set width
  },
});

export default HelpContainer;
