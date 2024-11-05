import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { VerticalSpacer } from './Spacer';
import { CustomColors, DynamicColors } from '../constants/CustomColors';
import { customTextStyles, SemiBoldText } from './CustomText';
import HelpContainer from './HelpContainer';

const HelpCenterWidget: React.FC = () => {
  return (
    <View style={styles.container}>
      <VerticalSpacer height={10} />

      {/* <View style={styles.header}>
      
        <SemiBoldText
            title="Help Center"
            fontSize={16}
            color={CustomColors.darkTextColor}
          />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgUri
            uri="path/to/xmark.svg"
            width={24}
            height={24}
            color={CustomColors.blackTextColor}
          />
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.paddingHorizontal}> */}
      <HelpContainer />

      {/* </View> */}

      <VerticalSpacer height={30} />

      <View style={styles.flexibleContainer}>
        <ScrollView>
          <View>
            <SemiBoldText
              title="What is this help center for?"
              fontSize={15}
              color={CustomColors.darkTextColor}
            />
            <VerticalSpacer height={10} />
            <Text
              style={[
                customTextStyles.regular,
                {
                  fontSize: 14,
                  color: CustomColors.blackTextColor,
                  lineHeight: 22,
                },
              ]}
            >
              This Help Center serves as a comprehensive resource, offering
              essential information, guidance, and support tailored to each page
              of your process.{' '}
              <Text
                style={[
                  customTextStyles.w500,
                  { fontSize: 15, color: DynamicColors().primaryBrandColor },
                ]}
              >
                For each page, just click on the help.
              </Text>
            </Text>

            <VerticalSpacer height={6} />
            <View style={styles.divider} />

            <SemiBoldText
              title="Why should I read and understand your privacy guidelines?"
              fontSize={15}
              color={CustomColors.darkTextColor}
            />

            <VerticalSpacer height={10} />
            <Text
              style={[
                customTextStyles.regular,
                {
                  fontSize: 14,
                  color: CustomColors.blackTextColor,
                  lineHeight: 22,
                },
              ]}
            >
              Understanding our privacy guidelines is crucial to ensuring a
              secure and transparent process.
            </Text>

            <VerticalSpacer height={6} />
            <View style={styles.divider} />

            <SemiBoldText
              title="How do I report technical issues or bugs?"
              fontSize={15}
              color={CustomColors.darkTextColor}
            />

            <VerticalSpacer height={10} />
            <Text
              style={[
                customTextStyles.regular,
                {
                  fontSize: 14,
                  color: CustomColors.blackTextColor,
                  lineHeight: 22,
                },
              ]}
            >
              If you encounter any technical issues or bugs during your
              inspection, please contact our support team at{' '}
              <Text
                style={[
                  customTextStyles.w500,
                  { fontSize: 15, color: DynamicColors().primaryBrandColor },
                ]}
              >
                support@mycover.ai.com
              </Text>
              .
            </Text>

            <VerticalSpacer height={6} />
            <View style={styles.divider} />
          </View>
        </ScrollView>
      </View>

      <VerticalSpacer height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  flexibleContainer: {
    flex: 1,
  },
  //   regularText: {
  //     fontSize: 14,
  //     color: CustomColors.blackTextColor,
  //     lineHeight: 20,
  //   },
  //   boldText: {
  //     fontSize: 15,
  //     fontWeight: '500',
  //     color: CustomColors.primaryBrandColor,
  //   },
  divider: {
    height: 0.5,
    backgroundColor: CustomColors.productBorderColor,
    marginVertical: 6,
  },
});

export default HelpCenterWidget;
