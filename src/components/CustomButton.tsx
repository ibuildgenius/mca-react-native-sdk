import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  type DimensionValue,
} from 'react-native'; // Import DimensionValue
import { CustomColors, DynamicColors } from '../constants/CustomColors';
import { Circle } from 'react-native-animated-spinkit';
import { W500Text } from './CustomText';

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  buttonColor?: string;
  opacityColor?: string;
  textColor?: string;
  width?: DimensionValue; // Update type to DimensionValue
  height?: DimensionValue; // Update type to DimensionValue
  fontSize?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  buttonColor = DynamicColors().primaryBrandColor,
  opacityColor = DynamicColors().opacityPrimaryBrandColor,
  textColor = CustomColors.whiteColor,
  width = '100%',
  height = 56,
  fontSize = 16,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: onPress == undefined ? opacityColor : buttonColor,
          width,
          height,
        },
      ]} // This should now work without errors
      onPress={isLoading ? undefined : onPress}
      disabled={isLoading || !onPress}
    >
      {isLoading ? (
        // <ActivityIndicator color={textColor} />
        <Circle size={28} color={textColor} />
      ) : (
        // <Text style={[styles.buttonText, {}]}>{title}</Text>
        <W500Text title={title} color={textColor} fontSize={fontSize} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CustomButton;
