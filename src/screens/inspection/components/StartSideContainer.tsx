import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import CustomButton from '../../../components/CustomButton';
import { getSideImage, getSideName, SideImage } from '../../../utils/enums';
import { type GlobalStore, useGlobalStore } from '../../../store/globalStore';

interface StartSideContainerProps {
  inspectionType: 'vehicle' | 'gadget'; // Assuming two types, you can modify based on the actual type
  step: any; // Define the appropriate type for step
  onTap: () => void;
}

const StartSideContainer: React.FC<StartSideContainerProps> = ({
  inspectionType,
  step,
  onTap,
}) => {
  const sideName = getSideName(step);
  const global = useGlobalStore((state: GlobalStore) => state);
  const sideImage = getSideImage(step, global);

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {inspectionType === 'gadget' ? 'Device ' : 'Vehicle '}
          <Text style={styles.highlightText}>{sideName} View</Text>
        </Text>
      </View>

      <Text style={styles.subText}>
        {inspectionType === 'gadget'
          ? `Snap Device ${sideName} View`
          : `Snap Vehicle ${sideName} View`}
      </Text>

      <View style={styles.imageContainer}>
        <Image
          source={
            sideImage == SideImage.front
              ? require('../../../assets/images/front_view_no_bg.webp')
              : sideImage == SideImage.chassisNumber
                ? require('../../../assets/images/chassis_number_no_bg.webp')
                : sideImage == SideImage.left
                  ? require('../../../assets/images/left_view_no_bg.webp')
                  : sideImage == SideImage.back
                    ? require('../../../assets/images/back_view_no_bg.webp')
                    : sideImage == SideImage.right
                      ? require('../../../assets/images/right_view_no_bg.webp')
                      : sideImage == SideImage.dashboard
                        ? require('../../../assets/images/dashboard_view_no_bg.webp')
                        : sideImage == SideImage.interior
                          ? require('../../../assets/images/interior_view_no_bg.webp')
                          : sideImage == SideImage.laptopFront
                            ? require('../../../assets/images/laptop_front_img.webp')
                            : sideImage == SideImage.phoneFrontImg
                              ? require('../../../assets/images/phone_front_img.webp')
                              : sideImage == SideImage.laptopBackImg
                                ? require('../../../assets/images/laptop_back_img.webp')
                                : sideImage == SideImage.phoneBackImg
                                  ? require('../../../assets/images/phone_back_img.webp')
                                  : sideImage == SideImage.laptopOtherImg
                                    ? require('../../../assets/images/laptop_other_img.webp')
                                    : sideImage == SideImage.phoneSideImg
                                      ? require('../../../assets/images/phone_side_img.webp')
                                      : sideImage == SideImage.laptopSettingsImg
                                        ? require('../../../assets/images/laptop_settings_img.webp')
                                        : sideImage ==
                                            SideImage.phoneSettingsImg
                                          ? require('../../../assets/images/phone_settings_img.webp')
                                          : require('../../../assets/images/left_view_sample.webp')
          }
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        {step === 'frontSidePreCapture' && (
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Go back"
              buttonColor={CustomColors.whiteColor}
              textColor={CustomColors.backTextColor}
              onPress={() => {
                // Go back functionality here
              }}
            />
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <CustomButton title="Start" onPress={onTap} />
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 380,
    backgroundColor: CustomColors.transGray100Color,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  spacer: {
    height: 55,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 21,
    fontWeight: '600',
    color: CustomColors.whiteColor,
  },
  highlightText: {
    fontSize: 21,
    fontWeight: '600',
    color: DynamicColors().primaryBrandColor,
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    color: CustomColors.whiteColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: 60,
    height: 150,

    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 35,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  bottomSpacer: {
    height: 50,
  },
});

export default StartSideContainer;
