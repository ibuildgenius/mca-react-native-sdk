import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SemiBoldText } from '../../../components/CustomText';

interface CustomCircleContainerProps {
  text: string;
}

const CustomCircleContainer: React.FC<CustomCircleContainerProps> = ({
  text,
}) => {
  return (
    <View style={styles.container}>
      <SemiBoldText title={text} textAlign="center" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 23,
    height: 23,
    borderRadius: 23 / 2, // Makes it a circle
    backgroundColor: '#E0E0E0', // Adjust to match CustomColors.dividerGreyColor
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600', // Equivalent to semiBoldText
  },
});

export default CustomCircleContainer;
