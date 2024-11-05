import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle } from 'react-native-animated-spinkit';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';
import { RegularText } from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';

const LoadingSideContainer: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.spacer} />

      <Text style={styles.verifyingText}>
        <Text style={styles.primaryText}>Verifying </Text>
        Vehicle Image
      </Text>

      <VerticalSpacer height={30} />

      <View style={styles.spinnerContainer}>
        <Circle size={35} color={DynamicColors().primaryBrandColor} />
      </View>

      <VerticalSpacer height={30} />

      <View style={styles.messageContainer}>
        <RegularText
          title="Hold on while we verify your image"
          textAlign="center"
          fontSize={16.5}
          color={CustomColors.whiteColor}
        />
      </View>

      <View style={styles.spacer} />

      <View style={styles.buttonRow}>
        {/* <TouchableOpacity style={[styles.button, styles.recaptureButton]}>
          <Text
            style={[styles.buttonText, {color: CustomColors.backTextColor}]}>
            Re-capture
          </Text>
        </TouchableOpacity> */}
        <View style={[styles.button]}>
          <CustomButton
            title="Re capture"
            buttonColor={CustomColors.whiteColor}
            textColor={CustomColors.backTextColor}
            onPress={() => null}
          />
        </View>

        <HorizontalSpacer width={20} />
        <View style={[styles.button]}>
          <CustomButton
            title="Verify"
            onPress={() => null}
            // buttonColor={CustomColors.whiteColor}
            // textColor={CustomColors.backTextColor}
          />
        </View>

        {/* <TouchableOpacity style={[styles.button, styles.verifyButton]}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    // flex: 1,
    backgroundColor: CustomColors.transGray100Color,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  spacer: {
    flex: 2,
  },
  verifyingText: {
    fontSize: 21,
    fontWeight: '600',
    color: CustomColors.whiteColor,
    textAlign: 'center',
  },
  primaryText: {
    color: DynamicColors().primaryBrandColor,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: CustomColors.whiteColor,
    borderRadius: 25,
    height: 50,
    width: 50,
    padding: 8,
  },
  messageContainer: {
    paddingHorizontal: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  button: {
    flex: 1,
    opacity: 0.6,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recaptureButton: {
    backgroundColor: CustomColors.whiteColor,
  },
  verifyButton: {
    backgroundColor: DynamicColors().primaryBrandColor,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default LoadingSideContainer;
