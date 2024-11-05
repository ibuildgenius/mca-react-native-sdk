// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import * as Progress from 'react-native-progress';
// import {Animated} from 'react-native';

// // Assuming you have custom colors defined similarly
// const CustomColors = {
//   whiteColor: '#FFFFFF',
//   blackColor: '#000000',
//   primaryBrandColor: '#007BFF',
//   lightOrangeBgColor: '#FFA500',
//   redColor: '#FF0000',
// };

// interface CountdownTimerProps {
//   controller: Animated.Value; // Equivalent to AnimationController in Flutter
//   timerString: string;
//   timerColor: string;
// }

// const CountdownTimer: React.FC<CountdownTimerProps> = ({
//   controller,
//   timerString,
//   timerColor,
// }) => {
//   const [timerValue, setTimerValue] = useState<number>(1); // Default timer value is 1 (full progress)

//   // Effect to listen for changes to the animation controller value
//   useEffect(() => {
//     const listenerId = controller.addListener(({value}) => {
//       setTimerValue(value);
//     });

//     return () => {
//       controller.removeListener(listenerId); // Cleanup listener on unmount
//     };
//   }, [controller]);

//   const getTimerColor = () => {
//     if (timerValue === 0) {
//       return CustomColors.blackColor;
//     } else if (timerValue > 0.4) {
//       return CustomColors.primaryBrandColor;
//     } else if (timerValue > 0.33) {
//       return CustomColors.lightOrangeBgColor;
//     } else {
//       return CustomColors.redColor;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.circularProgress}>
//         <Progress.Circle
//           size={42}
//           progress={timerValue} // Use the animated value
//           thickness={5}
//           color={getTimerColor()} // Dynamically set color
//           showsText={false}
//           borderWidth={0}
//           unfilledColor={CustomColors.blackColor}
//         />
//         <Text style={[styles.timerText, {color: timerColor}]}>
//           {timerString} {/* Using the provided timer string */}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default CountdownTimer;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   circularProgress: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   timerText: {
//     position: 'absolute',
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });

// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import * as Progress from 'react-native-progress';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';

// // Assuming you have custom colors defined similarly
// const CustomColors = {
//   whiteColor: '#FFFFFF',
//   blackColor: '#000000',
//   primaryBrandColor: '#007BFF',
//   lightOrangeBgColor: '#FFA500',
//   redColor: '#FF0000',
// };

// interface CountdownTimerProps {
//   controller: Animated.SharedValue<number>; // Equivalent to the controller
//   timerString: string;
//   timerColor: string;
// }

// const CountdownTimer: React.FC<CountdownTimerProps> = ({
//   controller,
//   timerString,
//   timerColor,
// }) => {
//   const [timerValue, setTimerValue] = useState<number>(controller.value); // Default timer value

//   // Effect to update state when the controller changes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimerValue(controller.value); // Update state from shared value
//     }, 1000); // Update every second

//     return () => clearInterval(interval);
//   }, [controller]);

//   const getTimerColor = () => {
//     if (timerValue === 0) {
//       return CustomColors.blackColor;
//     } else if (timerValue > 0.4) {
//       return CustomColors.primaryBrandColor;
//     } else if (timerValue > 0.33) {
//       return CustomColors.lightOrangeBgColor;
//     } else {
//       return CustomColors.redColor;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.circularProgress}>
//         <Progress.Circle
//           size={42}
//           progress={timerValue} // Use the shared value
//           thickness={5}
//           color={getTimerColor()} // Dynamically set color
//           showsText={false}
//           borderWidth={0}
//           unfilledColor={CustomColors.blackColor}
//         />
//         <Text style={[styles.timerText, {color: timerColor}]}>
//           {timerString} {/* Using the provided timer string */}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default CountdownTimer;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   circularProgress: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   timerText: {
//     position: 'absolute',
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import Animated from 'react-native-reanimated';
import { DynamicColors } from '../../../constants/CustomColors';
import CustomButton from '../../../components/CustomButton';
import Modal from 'react-native-modal';
import { RegularText } from '../../../components/CustomText';
import { VerticalSpacer } from '../../../components/Spacer';
import StepIndicator from './StepIndicator';
import { InspectionType } from '../../../utils/enums';
import ProviderUtils from '../../../utils/ProviderUtils';

// Assuming you have custom colors defined similarly
const CustomColors = {
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  primaryBrandColor: '#007BFF',
  lightOrangeBgColor: '#FFA500',
  redColor: '#FF0000',
};

interface CountdownTimerProps {
  controller: Animated.SharedValue<number>; // Equivalent to the controller
  resetTimer: () => void; // Add resetTimer as a prop
  verificationStep: number;
  inspectionType: InspectionType;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  controller,
  resetTimer,
  verificationStep,
  inspectionType,
}) => {
  const [timerValue, setTimerValue] = useState<number>(controller.value); // Default timer value
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false); // State to track if timer is up

  // Modal state
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(controller.value);
      setTimerValue(controller.value); // Update state from shared value
      if (controller.value === 0) {
        setIsTimeUp(true);
        setModalVisible(true); // Show the modal when timer reaches 0
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [controller]);

  const getTimerString = () => {
    const totalSeconds = 300 * timerValue; // 300 seconds = 5 minutes
    const minutes = Math.floor(totalSeconds / 60).toString();
    const seconds = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const getTimerColor = () => {
    if (timerValue === 0) {
      return CustomColors.blackColor;
    } else if (timerValue > 0.66) {
      return DynamicColors().primaryBrandColor;
    } else if (timerValue > 0.33) {
      return CustomColors.lightOrangeBgColor;
    } else {
      return CustomColors.redColor;
    }
  };

  const timeUpDialog = () => (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={{ flex: 1 }} />
        <Image
          source={require('../../../assets/images/time_up.webp')}
          style={styles.image}
        />
        <VerticalSpacer height={30} />

        <RegularText
          title="You have exceeded the time allocated to complete this inspection, you may need to go back
          to re-conduct this inspection."
          fontSize={16}
          textAlign="center"
        />
        <View style={{ flex: 1 }} />
        <CustomButton
          title="Re-conduct Inspection"
          onPress={() => {
            setModalVisible(false); // Close the modal
            ProviderUtils.resetVerificationProviders();
            resetTimer(); // Reset the timer
          }}
          // buttonColor={CustomColors.whiteColor}
          // textColor={CustomColors.backTextColor}
        />
        <View style={{ flex: 1 }} />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.circularProgress}>
        <Progress.Circle
          size={42}
          progress={timerValue} // Use the shared value
          thickness={5}
          color={getTimerColor()} // Dynamically set color
          showsText={false}
          borderWidth={0}
          unfilledColor={CustomColors.whiteColor}
        />
        <Text style={[styles.timerText, { color: getTimerColor() }]}>
          {getTimerString()} {/* Display formatted time */}
        </Text>
      </View>
      <StepIndicator
        inspectionType={inspectionType}
        verificationStep={verificationStep}
      />
      {/* Render Time-Up Modal */}
      {isTimeUp && timeUpDialog()}
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  circularProgress: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: CustomColors.whiteColor,
  },
  timerText: {
    position: 'absolute',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    // backgroundColor: CustomColors.whiteColor,
  },
  modalContainer: {
    backgroundColor: CustomColors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    width: 400,
    height: 300,
    borderRadius: 10,
  },
  image: {
    // width: '70%',
    height: 50,
    resizeMode: 'contain',
  },
});
