import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import { customTextStyles, SemiBoldText } from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SDKErrorScreenProps {
  error: string;
}

type SDKErrorScreenRouteProps = RouteProp<RootStackParamList, 'SDKErrorScreen'>;

const SDKErrorScreen: React.FC<SDKErrorScreenProps> = () => {
  // const [isLoading, setIsLoading] = useState(false);
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  const route = useRoute<SDKErrorScreenRouteProps>();
  const { error } = route.params;

  const handleClose = () => {
    // Close the SDK screen logic
    navigation.popToTop(); // Pop until the initial screen
    navigation.goBack(); // Navigate back
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.spacer} />

      {/* Lottie Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/lottie/sdk_error_animation.json')}
          autoPlay
          loop={true}
          style={styles.lottie}
        />
      </View>

      {/* Error Title */}
      <SemiBoldText
        title={'SDK Initialization Error'}
        fontSize={25}
        color={CustomColors.orangeColor}
        textAlign="center"
      />

      <View style={styles.spacerSmall} />

      {/* Error Message */}
      <Text
        style={[
          customTextStyles.regular,
          {
            fontSize: 16,
            color: CustomColors.formTitleColor,
            textAlign: 'center',
            marginVertical: 10,
            lineHeight: 22,
          },
        ]}
      >
        We encountered an initialization issue because{' '}
        <Text
          style={[
            customTextStyles.semiBold,
            { fontSize: 17, color: DynamicColors().primaryBrandColor },
          ]}
        >
          {error}
        </Text>
        . It seems there's an error in the initialization process.
      </Text>

      <View style={styles.spacerLarge} />

      {/* Error Solution Box */}
      <View style={styles.solutionBox}>
        <Text
          style={[
            customTextStyles.semiBold,
            { fontSize: 16, color: CustomColors.blackColor },
          ]}
        ></Text>

        <SemiBoldText
          title={'What to do next:'}
          fontSize={16}
          color={CustomColors.blackColor}
        />

        <View style={styles.spacerSmall} />

        <Text
          style={[
            customTextStyles.w500,
            {
              fontSize: 14,
              color: CustomColors.blackTextColor,
              lineHeight: 22,
            },
          ]}
        >
          1. Retry Initialization:{' '}
          <Text style={customTextStyles.regular}>
            Click the button below to close the SDK and attempt initializing the
            SDK again with the correct parameters.
          </Text>
        </Text>
      </View>

      <View style={styles.spacerLarge} />

      {/* Close Button */}

      <CustomButton
        // isLoading={isLoading}

        title="Close"
        onPress={handleClose}
      />

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
  spacerSmall: {
    height: 20,
  },
  spacerLarge: {
    height: 30,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: '100%',
    height: 200,
  },
  // errorTitle: {
  //   fontSize: 25,
  //   color: CustomColors.orangeColor,
  //   textAlign: 'center',
  // },
  // errorText: {
  //   fontSize: 16,
  //   color: CustomColors.formTitleColor,
  //   textAlign: 'center',
  //   marginVertical: 10,
  //   lineHeight: 22,
  // },
  solutionBox: {
    backgroundColor: CustomColors.lightOrangeColor,
    padding: 20,
    borderColor: CustomColors.orangeColor,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  // solutionTitle: {
  //   fontSize: 16,
  //   color: CustomColors.blackColor,
  // },
  solutionText: {
    fontSize: 14,
    color: CustomColors.blackTextColor,
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: CustomColors.orangeColor,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SDKErrorScreen;
