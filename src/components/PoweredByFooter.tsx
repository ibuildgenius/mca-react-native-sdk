import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CustomColors } from '../constants/CustomColors';

import PoweredIcon from '../assets/icons/powered_icon.svg';
import { W500Text } from './CustomText';
import { HorizontalSpacer } from './Spacer';

const PoweredByFooter: React.FC = () => {
  //   if (businessDetails?.isWatermark === null || businessDetails?.isWatermark === true) {
  return (
    <View style={styles.footerContainer}>
      <PoweredIcon width={20} height={20} />
      <HorizontalSpacer width={7} />
      <W500Text
        title="Powered by"
        fontSize={14}
        color={CustomColors.greyTextColor}
      />
      <HorizontalSpacer width={7} />
      <Image
        source={require('../assets/images/mycover_logo.png')}
        style={styles.logoImage}
      />
    </View>
  );
  //   } else {
  //     return null;
  //   }
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1,
    paddingTop: 18,
  },
  footerText: {
    fontSize: 14,
    color: CustomColors.greyTextColor,
    fontWeight: '500',
  },
  logoImage: {
    height: 20,
    width: 100,
    resizeMode: 'contain',
  },
});

export default PoweredByFooter;
