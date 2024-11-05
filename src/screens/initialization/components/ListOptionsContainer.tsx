import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { SemiBoldText, RegularText } from '../../../components/CustomText';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';

interface ListOptionsContainerProps {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onTap?: () => void;
}

const ListOptionsContainer: React.FC<ListOptionsContainerProps> = ({
  title,
  subTitle,
  icon,
  isSelected,
  onTap,
}) => {
  return (
    <TouchableOpacity onPress={onTap}>
      <Animated.View
        style={[
          styles.container,
          {
            borderColor: isSelected
              ? DynamicColors().primaryBrandColor
              : 'transparent',
            borderWidth: isSelected ? 1.5 : 0,
          },
        ]}
      >
        <View style={styles.content}>
          {/* Render the icon as a component */}
          <View style={styles.iconContainer}>{icon}</View>

          <HorizontalSpacer width={20} />
          <View style={{ flex: 1 }}>
            {/* <Text style={[SemiBoldText, styles.title]}>{title}</Text> */}
            <SemiBoldText
              title={title}
              fontSize={16}
              color={CustomColors.blackColor}
            />

            <VerticalSpacer height={5} />
            <RegularText
              title={subTitle}
              fontSize={12}
              color={CustomColors.greyTextColor}
            />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,

    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: 38,
    width: 38,
    borderRadius: 5,
    backgroundColor: DynamicColors().lightPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: CustomColors.blackTextColor,
  },
  subTitle: {
    fontSize: 12,
    color: CustomColors.greyTextColor,
  },
});

export default ListOptionsContainer;
