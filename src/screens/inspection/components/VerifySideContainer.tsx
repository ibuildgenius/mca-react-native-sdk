import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import {
  getSideImage,
  getSideName,
  getVerificationStage,
  SideImage,
} from '../../../utils/enums';
import { type GlobalStore, useGlobalStore } from '../../../store/globalStore';
import {
  customTextStyles,
  RegularText,
  SemiBoldText,
} from '../../../components/CustomText';

interface VerifySideContainerProps {
  step: any; // Replace with the correct type for the step
  // imageFile: string | null;
  inspectionType: 'vehicle' | 'gadget';
  onReCaptureTap?: () => void;
  onVerifyTap?: () => void;
}

const VerifySideContainer: React.FC<VerifySideContainerProps> = ({
  step,
  // imageFile,
  inspectionType,
  onReCaptureTap,
  onVerifyTap,
}) => {
  const isFailed = getVerificationStage(step) === 'failed'; // Assuming a string comparison, replace with actual logic
  const sideName = getSideName(step);
  const global = useGlobalStore((state: GlobalStore) => state);
  const sideImage = getSideImage(step, global);

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />

      <View style={styles.contentContainer}>
        {isFailed ? (
          <SemiBoldText
            title={`Wrong ${
              inspectionType === 'gadget' ? 'Device ' : 'Vehicle '
            } view`}
            fontSize={21}
            color={CustomColors.toastRedColor}
            textAlign="center"
          />
        ) : (
          <Text style={styles.text}>
            {inspectionType === 'gadget' ? 'Device ' : 'Vehicle '}
            <Text
              style={[
                customTextStyles.semiBold,
                {
                  fontSize: 21,
                  fontWeight: '600',
                  color: DynamicColors().primaryBrandColor,
                },
              ]}
            >{`${sideName} View`}</Text>
          </Text>
        )}

        {inspectionType === 'gadget' && (
          <Text style={styles.subText}>
            Confirm Device {sideName.toLowerCase()} View
          </Text>
        )}

        <View style={styles.spacer} />

        {isFailed ? (
          <View>
            <RegularText
              title={`Not a valid ${
                inspectionType === 'gadget' ? 'device ' : 'car '
              } image`}
              fontSize={14}
              color={CustomColors.toastRedColor}
              textAlign="center"
            />
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
                                            : sideImage ==
                                                SideImage.laptopSettingsImg
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
            <Text
              style={[
                customTextStyles.regular,
                {
                  fontSize: 16,
                  fontWeight: '400',
                  color: CustomColors.whiteColor,
                  textAlign: 'center',
                  marginTop: 10,
                  paddingHorizontal: 30,
                },
              ]}
            >
              You have to recapture{' '}
              <Text
                style={[
                  customTextStyles.semiBold,
                  {
                    fontSize: 21,
                    fontWeight: '600',
                    color: DynamicColors().primaryBrandColor,
                  },
                ]}
              >
                {`${sideName} View`}
              </Text>
            </Text>
          </View>
        ) : (
          <Text
            style={[
              customTextStyles.regular,
              {
                fontSize: 16.5,
                fontWeight: '500',
                color: CustomColors.whiteColor,
                textAlign: 'center',
                marginTop: 10,
                paddingHorizontal: 30,
              },
            ]}
          >
            {inspectionType === 'gadget'
              ? `Confirm Device ${sideName.toLowerCase()} view to proceed`
              : `Confirm Vehicle ${sideName.toLowerCase()} view to move to the next Vehicle view`}
          </Text>
        )}
      </View>
      <View style={styles.spacer} />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <CustomButton
            title="Re capture"
            buttonColor={CustomColors.whiteColor}
            textColor={CustomColors.backTextColor}
            onPress={onReCaptureTap}
          />
        </View>

        {!isFailed && (
          <View style={styles.buttonWrapper}>
            <CustomButton title="Verify" onPress={onVerifyTap} />
          </View>
        )}
      </View>

      <View style={styles.miniSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: '100%',
    backgroundColor: CustomColors.transGray100Color,
    justifyContent: 'center',
  },
  spacer: {
    flex: 2,
  },
  miniSpacer: {
    flex: 1,
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  text: {
    fontSize: 21,
    fontWeight: '600',
    color: CustomColors.whiteColor,
    textAlign: 'center',
  },

  subText: {
    fontSize: 16.5,
    fontWeight: '500',
    color: CustomColors.whiteColor,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  imageContainer: {
    height: 120,
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default VerifySideContainer;
