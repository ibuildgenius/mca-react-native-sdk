import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DynamicColors } from '../constants/CustomColors'; // Assuming you have a CustomColors file for colors

interface IconContainerProps {
  size?: number; // Optional size prop
  icon: React.ReactNode; // Icon component to be passed
}

const IconContainer: React.FC<IconContainerProps> = ({ size = 38, icon }) => {
  return (
    <View
      style={[
        styles.iconContainer,
        {
          height: size,
          width: size,
          backgroundColor: DynamicColors().lightPrimaryColor,
        },
      ]}
    >
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 5,
    backgroundColor: DynamicColors().lightPrimaryColor,
    justifyContent: 'center', // Vertically centers the icon
    alignItems: 'center', // Horizontally centers the icon
  },
});

export default IconContainer;
