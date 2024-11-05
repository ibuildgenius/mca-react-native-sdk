import React from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { CustomColors } from '../constants/CustomColors'; // Assuming you have a constants file for colors

interface CustomTextProps extends TextProps {
  title: string;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  maxLines?: number;
}

export const SemiBoldText: React.FC<CustomTextProps> = ({
  title,
  fontSize = 13,
  color = CustomColors.blackTextColor,
  textAlign = 'left',
  lineHeight,
  maxLines,
}) => (
  <Text
    style={[
      customTextStyles.semiBold,
      { fontSize, color, textAlign, lineHeight },
    ]}
    numberOfLines={maxLines}
    // {...props}
  >
    {title}
  </Text>
);

export const RegularText: React.FC<CustomTextProps> = ({
  title,
  fontSize = 13,
  color = CustomColors.blackTextColor,
  textAlign = 'left',
  lineHeight,
  maxLines,
  ...props
}) => (
  <Text
    style={[
      customTextStyles.regular,
      { fontSize, color, textAlign, lineHeight },
    ]}
    numberOfLines={maxLines}
    {...props}
  >
    {title}
  </Text>
);

export const W500Text: React.FC<CustomTextProps> = ({
  title,
  fontSize = 13,
  color = CustomColors.blackTextColor,
  lineHeight,
  textAlign = 'left',
  maxLines,
  ...props
}) => (
  <Text
    style={[customTextStyles.w500, { fontSize, color, textAlign, lineHeight }]}
    numberOfLines={maxLines}
    {...props}
  >
    {title}
  </Text>
);

export const customTextStyles = StyleSheet.create({
  semiBold: {
    // fontWeight: 'normal', // Equivalent to semi-bold
    fontFamily: 'PhantomSans-SemiBold',
    // fontSize:45,
  } as TextStyle,
  regular: {
    // fontWeight: '400', // Equivalent to regular
    fontFamily: 'PhantomSans-Regular',
  } as TextStyle,
  w500: {
    // fontWeight: '500', // Medium weight for w500
    fontFamily: 'PhantomSans-Medium',
  } as TextStyle,
});
