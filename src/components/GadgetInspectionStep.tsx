import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CustomColors, DynamicColors } from '../constants/CustomColors';
import { customTextStyles, SemiBoldText, W500Text } from './CustomText';
import { HorizontalSpacer, VerticalSpacer } from './Spacer';
import { GadgetType, PageViewContent } from '../utils/enums';
// import PrivacyDotContainer from './PrivacyDotContainer';
// import Global from '../globals'; // Assuming you have a Global file for global variables
import PrivacyDotContainer from './PrivacyDotContainer';
import globalObject from '../store/globalObject';

type Props = {
  content: PageViewContent;

  imageTitle?: string;
};

const GadgetInspectionStep: React.FC<Props> = ({
  content,

  imageTitle,
}) => {
  return (
    <View style={styles.container}>
      {content === PageViewContent.firstAutoPage && (
        <View>
          <View style={styles.row}>
            <View style={styles.circle} />
            <HorizontalSpacer width={10} />
            <Text
              style={[
                customTextStyles.regular,
                { fontSize: 17, color: CustomColors.blackTextColor },
              ]}
            >
              Below are things you need to know before conducting the
              inspection.
            </Text>
          </View>

          <VerticalSpacer height={20} />
          <View style={styles.infoBox}>
            <View style={styles.paddingContainer}>
              <SemiBoldText
                title="1. Verify the insured Gadget"
                fontSize={16.5}
              />

              <VerticalSpacer height={10} />
              <PrivacyDotContainer title="Ensure you are inspecting the correct gadget that is covered by your insurance policy." />

              <VerticalSpacer height={20} />

              <SemiBoldText
                title="2. Capture Detailed Images:"
                fontSize={16.5}
              />
              <VerticalSpacer height={10} />
              <PrivacyDotContainer title="Take clear photos of all views of your gadget." />
              <PrivacyDotContainer title="Include the gadget's properties such as the serial number or IMEI number." />
              <PrivacyDotContainer
                title=""
                titleChild={
                  <Text style={styles.regularText}>
                    Ensure the gadget occupies approximately{' '}
                    <Text
                      style={[
                        styles.boldText,
                        { color: DynamicColors().primaryBrandColor },
                      ]}
                    >
                      80%
                    </Text>{' '}
                    of your camera screen in each photo.
                  </Text>
                }
              />

              <VerticalSpacer height={20} />

              <SemiBoldText
                title="3. Find and Capture Serial/IMEI Number:"
                fontSize={16.5}
              />
              <VerticalSpacer height={10} />
              <PrivacyDotContainer
                title=""
                titleChild={
                  <Text style={styles.regularText}>
                    Locate the serial number or IMEI number in your{' '}
                    <Text
                      style={[
                        styles.boldText,
                        { color: DynamicColors().primaryBrandColor },
                      ]}
                    >
                      {globalObject.gadgetType === 'laptop'
                        ? 'laptop'
                        : 'phone'}
                      's settings
                    </Text>
                    .
                  </Text>
                }
              />
              <PrivacyDotContainer
                title={`If the ${
                  globalObject.gadgetType === 'laptop' ? 'laptop' : 'phone'
                } is damaged and you can't access the settings, check the back of the ${
                  globalObject.gadgetType === 'laptop' ? 'laptop' : 'phone'
                }.`}
              />
              <PrivacyDotContainer
                title={`The serial / IMEI number can often be found internally or externally on the ${
                  globalObject.gadgetType === 'laptop' ? 'laptop' : 'phone'
                }.`}
              />
            </View>
          </View>

          <VerticalSpacer height={40} />
          <View style={styles.infoBox}>
            <Text
              style={[
                customTextStyles.regular,
                { fontSize: 15, color: CustomColors.blackTextColor },
              ]}
            >
              If you encounter any technical issues or bugs during your
              inspection, please contact our support team at{' '}
              <Text
                style={[
                  styles.linkText,
                  { color: DynamicColors().primaryBrandColor },
                ]}
              >
                Inspectionsupport@mycover.ai.com
              </Text>
            </Text>
          </View>

          <VerticalSpacer height={70} />
        </View>
      )}

      {content === PageViewContent.secondAutoPage && (
        <View>
          <Text
            style={[
              customTextStyles.regular,
              { fontSize: 15, color: CustomColors.blackTextColor },
            ]}
          >
            Below are the parts of your{' '}
            {globalObject.gadgetType === 'laptop' ? 'laptop' : 'phone'} images
            that should be captured.
          </Text>
          <VerticalSpacer height={20} />

          <View style={styles.imageContainer}>
            <VerticalSpacer height={10} />
            <W500Text
              title={
                globalObject.gadgetType == GadgetType.laptop
                  ? 'Laptop top view'
                  : 'Phone front view'
              }
              color={DynamicColors().primaryBrandColor}
              fontSize={16.5}
              textAlign="center"
            />
            <VerticalSpacer height={10} />
            <Image
              source={
                globalObject.gadgetType === 'laptop'
                  ? require('../assets/images/laptop_front_img.webp')
                  : require('../assets/images/phone_front_img.webp')
              }
              style={styles.image}
            />
          </View>

          <VerticalSpacer height={20} />

          <View style={styles.imageContainer}>
            <VerticalSpacer height={10} />
            <W500Text
              title={
                globalObject.gadgetType == GadgetType.laptop
                  ? 'Laptop Back View'
                  : 'Phone Back View'
              }
              color={DynamicColors().primaryBrandColor}
              fontSize={16.5}
              textAlign="center"
            />
            <VerticalSpacer height={10} />
            <Image
              source={
                globalObject.gadgetType === 'laptop'
                  ? require('../assets/images/laptop_back_img.webp')
                  : require('../assets/images/phone_back_img.webp')
              }
              style={styles.image}
            />
          </View>
          <VerticalSpacer height={20} />
          <View style={styles.imageContainer}>
            <VerticalSpacer height={10} />
            <W500Text
              title={
                globalObject.gadgetType == GadgetType.laptop
                  ? 'Laptop Internal Properties'
                  : 'Phone Internal Properties'
              }
              color={DynamicColors().primaryBrandColor}
              fontSize={16.5}
              textAlign="center"
            />
            <VerticalSpacer height={10} />
            <Image
              source={
                globalObject.gadgetType === 'laptop'
                  ? require('../assets/images/laptop_settings_img.webp')
                  : require('../assets/images/phone_settings_img.webp')
              }
              style={styles.image}
            />
          </View>
          <VerticalSpacer height={20} />

          <View style={styles.imageContainer}>
            <VerticalSpacer height={10} />
            <W500Text
              title={
                globalObject.gadgetType == GadgetType.laptop
                  ? 'Laptop Other View'
                  : 'Phone Side View'
              }
              color={DynamicColors().primaryBrandColor}
              fontSize={16.5}
              textAlign="center"
            />
            <VerticalSpacer height={10} />
            <Image
              source={
                globalObject.gadgetType === 'laptop'
                  ? require('../assets/images/laptop_other_img.webp')
                  : require('../assets/images/phone_side_img.webp')
              }
              style={styles.image}
            />
          </View>
        </View>
      )}

      {content === PageViewContent.thirdAutoPage && (
        <View>
          <Text
            style={[
              customTextStyles.regular,
              { fontSize: 16, color: CustomColors.blackTextColor },
            ]}
          >
            Capture images of all views of your gadget, including internal views
            (dashboard and back seat), ensuring it occupies approximately{' '}
            <Text
              style={[
                styles.boldText,
                { color: DynamicColors().primaryBrandColor },
              ]}
            >
              80%
            </Text>{' '}
            of your camera screen.
          </Text>
          <VerticalSpacer height={20} />
          {/* Add more views as needed */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/front_view_sample.webp')}
              style={styles.image}
            />
          </View>
        </View>
      )}

      {/* More conditions based on content */}

      {imageTitle && (
        <>
          <VerticalSpacer height={10} />
          <Text style={styles.imageTitle}>{imageTitle}</Text>
          <VerticalSpacer height={10} />
        </>
      )}
    </View>
  );
};

export default GadgetInspectionStep;

const styles = StyleSheet.create({
  paddingContainer: {
    paddingLeft: 10,
  },

  container: {
    padding: 15,
    backgroundColor: CustomColors.whiteColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  circle: {
    height: 7,
    width: 7,
    borderRadius: 7 / 2,
    backgroundColor: CustomColors.blackTextColor,
    marginTop: 8,
  },
  infoBox: {
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 6,
    padding: 15,
  },
  stepTitle: {
    fontSize: 16,
    color: DynamicColors().primaryBrandColor,
    fontWeight: '600',
  },
  regularText: {
    fontSize: 15,
    color: CustomColors.blackTextColor,
  },
  boldText: {
    fontWeight: '500',
    color: DynamicColors().primaryBrandColor,
  },
  linkText: {
    color: DynamicColors().primaryBrandColor,
    fontWeight: '500',
  },
  imageContainer: {
    backgroundColor: CustomColors.gray100Color,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  imageTitle: {
    color: CustomColors.grayTextColor,
    fontSize: 16,
  },
});
