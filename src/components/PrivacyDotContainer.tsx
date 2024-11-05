import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomColors } from '../constants/CustomColors';
import { HorizontalSpacer, VerticalSpacer } from './Spacer'; // Assuming you have a Spacer component for spacing
import { RegularText } from './CustomText';

type PrivacyDotContainerProps = {
  title: string;
  titleChild?: React.ReactNode;
};

const PrivacyDotContainer: React.FC<PrivacyDotContainerProps> = ({
  title,
  titleChild,
}) => {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.circle} />
        <HorizontalSpacer width={10} />
        {titleChild ? (
          titleChild
        ) : (
          <RegularText title={title || ''} fontSize={16} lineHeight={21} />
        )}
      </View>
      <VerticalSpacer height={5} />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  circle: {
    height: 7,
    width: 7,
    borderRadius: 7 / 2,
    backgroundColor: CustomColors.blackColor,
    marginTop: 8,
  },
  text: {
    fontSize: 15,
    color: CustomColors.blackTextColor,
  },
});

export default PrivacyDotContainer;
