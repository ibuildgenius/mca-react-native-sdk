import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import IconContainer from '../../../components/IconContainer';
import { VerticalSpacer } from '../../../components/Spacer';
import { RegularText, SemiBoldText } from '../../../components/CustomText';

interface GridOptionsContainerProps {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onTap?: () => void;
}

const GridOptionsContainer: React.FC<GridOptionsContainerProps> = ({
  title,
  subTitle,
  icon,
  isSelected,
  onTap,
}) => {
  return (
    <TouchableOpacity onPress={onTap} style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            borderColor: isSelected
              ? DynamicColors().primaryBrandColor
              : 'transparent',
          },
        ]}
      >
        <View style={styles.content}>
          <IconContainer icon={icon} size={41} />
          <VerticalSpacer height={20} />
          {/* <Text style={styles.titleText}>{title}</Text> */}
          <SemiBoldText
            title={title}
            fontSize={16}
            color={CustomColors.blackColor}
          />
          <VerticalSpacer height={5} />
          <RegularText
            title={subTitle}
            fontSize={13}
            color={CustomColors.greyTextColor}
          />
          {/* <Text style={styles.subTitleText}>{subTitle}</Text> */}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    height: 185,
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  content: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: CustomColors.blackTextColor,
  },
  subTitleText: {
    fontSize: 12,
    color: CustomColors.greyTextColor,
  },
});

export default GridOptionsContainer;
