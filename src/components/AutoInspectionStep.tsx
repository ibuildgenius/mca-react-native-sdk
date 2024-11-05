import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CustomColors, DynamicColors } from '../constants/CustomColors';
import { customTextStyles } from './CustomText';
import { HorizontalSpacer, VerticalSpacer } from './Spacer';
import { PageViewContent } from '../utils/enums';

type Props = {
  content: PageViewContent;
  //   imageUrl: string;
  section1Text?: string;
  section2Text?: string;
  section3Text?: string;
  section4Text?: string;
  section5Text?: string;
  section6Text?: string;
  imageTitle?: string;
};

const AutoInspectionStep1: React.FC<Props> = ({ content, imageTitle }) => {
  return (
    <View style={styles.container}>
      {content === PageViewContent.firstAutoPage && (
        <View>
          {/* Instruction Text */}
          <View style={styles.row}>
            <View style={styles.circle} />
            <HorizontalSpacer width={10} />
            <Text
              style={[
                customTextStyles.regular,
                { fontSize: 17, color: CustomColors.blackColor },
              ]}
            >
              Ensure that your browser's{' '}
              <Text style={styles.boldText}>location </Text> and{' '}
              <Text style={styles.boldText}>camera</Text> permissions are
              enabled.
            </Text>
          </View>

          {/* Images */}
          <VerticalSpacer height={20} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/iphone_inspect_location.webp')}
              style={styles.image}
            />
          </View>

          <VerticalSpacer height={30} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/iphone_inspect_internet.webp')}
              style={styles.image}
            />
          </View>

          {/* Stable Internet Connection Text */}
          <VerticalSpacer height={40} />
          <View style={styles.row}>
            <View style={styles.circle} />
            <HorizontalSpacer width={10} />
            <Text
              style={[
                customTextStyles.regular,
                { fontSize: 17, color: CustomColors.blackColor },
              ]}
            >
              Ensure a stable internet connection before proceeding with the
              inspection.
            </Text>
          </View>

          {/* Support Information */}
          <VerticalSpacer height={40} />
          <View style={styles.infoBox}>
            <Text
              style={[
                customTextStyles.regular,
                { fontSize: 15, color: CustomColors.blackColor },
              ]}
            >
              If you encounter any technical issues or bugs during your
              inspection, please contact our support team at{' '}
              <Text style={styles.linkText}>
                Inspectionsupport@mycover.ai.com
              </Text>
            </Text>
          </View>
        </View>
      )}

      {/* Conditional Rendering for Other Pages */}
      {content === PageViewContent.secondAutoPage && (
        <View>
          <Text
            style={[
              customTextStyles.regular,
              { fontSize: 17, color: CustomColors.blackColor },
            ]}
          >
            Park your Vehicle in a <Text style={styles.boldText}>well-lit</Text>{' '}
            and <Text style={styles.boldText}>spacious area</Text>, ensuring
            there are <Text style={styles.boldText}>no obstructions.</Text>
          </Text>
          <VerticalSpacer height={20} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/inspection_well_lit.webp')}
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
              { fontSize: 17, color: CustomColors.blackColor },
            ]}
          >
            Capture images of <Text style={styles.boldText}>all views</Text> of
            your vehicle including{' '}
            <Text style={styles.boldText}>internal Views</Text> (dashboard and
            back seat), ensuring it occupies approximately{' '}
            <Text style={styles.boldText}>80%</Text> of your camera screen.
          </Text>
          <VerticalSpacer height={20} />

          {/* Images for different views */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/front_view_sample.webp')}
              style={styles.image}
            />
          </View>
          <VerticalSpacer height={30} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/left_view_sample.webp')}
              style={styles.image}
            />
          </View>
          <VerticalSpacer height={30} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/back_view_sample.webp')}
              style={styles.image}
            />
          </View>
          <VerticalSpacer height={30} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/right_view_sample.webp')}
              style={styles.image}
            />
          </View>
        </View>
      )}

      {content === PageViewContent.fourthAutoPage && (
        <View>
          {/* Note Section */}
          <View style={styles.infoBox}>
            <Text
              style={[
                customTextStyles.regular,
                { fontSize: 17, color: CustomColors.blackColor },
              ]}
            >
              <Text
                style={[
                  customTextStyles.regular,
                  { fontSize: 17, color: CustomColors.blackColor },
                ]}
              >
                Note:
              </Text>{' '}
              Double-check to avoid errors when capturing your chassis number.
              It consists of{' '}
              <Text style={styles.boldText}>17 digits and letters</Text>.
            </Text>
          </View>
          <VerticalSpacer height={15} />

          {/* Sample Chassis Number Images */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/chasis_number_sample2.webp')}
              style={styles.image}
            />
          </View>
          <VerticalSpacer height={20} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/chasis_number_sample3.webp')}
              style={styles.image}
            />
          </View>
          <VerticalSpacer height={20} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/chasis_number_sample4.webp')}
              style={styles.image}
            />
          </View>
        </View>
      )}

      {imageTitle && (
        <>
          <VerticalSpacer height={10} />
          <Text style={styles.imageTitle}>{imageTitle}</Text>
          <VerticalSpacer height={10} />
        </>
      )}

      {/* Main Image */}
      <View style={styles.imageContainer}>
        {/* <Image source={{uri: imageUrl}} style={styles.image} /> */}
      </View>
    </View>
  );
};

export default AutoInspectionStep1;

const styles = StyleSheet.create({
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
    backgroundColor: CustomColors.blackColor,
    marginTop: 8,
  },

  boldText: {
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
    resizeMode: 'cover',
  },
  infoBox: {
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 6,
    padding: 15,
  },

  linkText: {
    color: DynamicColors().primaryBrandColor,
    fontWeight: '500',
  },
  imageTitle: {
    color: CustomColors.grayTextColor,
    fontSize: 16,
  },
});
