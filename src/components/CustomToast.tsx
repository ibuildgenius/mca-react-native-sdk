// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
// import {CustomColors} from '../constants/CustomColors';
// import {ToastStatus} from '../utils/enums';
// import Toast from 'react-native-toast-message';
// import {ColorUtils} from '../utils/colorUtils';
// import {HorizontalSpacer, VerticalSpacer} from './Spacer';
// import {W500Text} from './CustomText';
// import ToastSuccessIcon from '../assets/icons/toast_success_icon.svg';
// import ToastPendingIcon from '../assets/icons/toast_pending_icon.svg';
// import ToastFailedIcon from '../assets/icons/toast_failed_icon.svg';

// const ToastContent = ({message, status, duration}) => {
//   const [progress] = useState(new Animated.Value(1));

//   useEffect(() => {
//     progress.setValue(1);

//     Animated.timing(progress, {
//       toValue: 0,
//       duration: duration || 4000,
//       useNativeDriver: false,
//     }).start();

//     return () => progress.stopAnimation();
//   }, [progress, duration]);

//   const pauseProgress = () => {
//     progress.stopAnimation((currentValue) => {
//       const elapsed = Date.now() - startTime;
//       setRemainingDuration(duration - elapsed);
//       setIsPaused(true);
//     });
//   };

//   const resumeProgress = () => {
//     setIsPaused(false);
//     startProgress();
//   };

//   const getProgressColor = () => {
//     switch (status) {
//       case ToastStatus.success:
//         return ColorUtils.hexToRgba(`${CustomColors.toastGreenColor}`, 0.7);
//       case ToastStatus.pending:
//         return ColorUtils.hexToRgba(`${CustomColors.toastOrangeColor}`, 0.7);
//       case ToastStatus.failed:
//       default:
//         return ColorUtils.hexToRgba(`${CustomColors.toastRedColor}`, 0.7);
//     }
//   };

//   const getBackgroundColor = () => {
//     switch (status) {
//       case ToastStatus.success:
//         return CustomColors.toastGreenColor;
//       case ToastStatus.pending:
//         return CustomColors.toastOrangeColor;
//       case ToastStatus.failed:
//       default:
//         return CustomColors.toastRedColor;
//     }
//   };

//   const getToastIcon = () => {
//     switch (status) {
//       case ToastStatus.success:
//         return <ToastSuccessIcon width={22} height={22} />;
//       case ToastStatus.pending:
//         return <ToastPendingIcon width={22} height={22} />;
//       case ToastStatus.failed:
//       default:
//         return <ToastFailedIcon width={22} height={22} />;
//     }
//   };

//   return (
//     <View style={{}}>
//       <View
//         style={[
//           styles.toastContainer,
//           {
//             backgroundColor: CustomColors.whiteColor,
//             elevation: 5,
//             shadowColor: '#000',
//             shadowOffset: {width: 0, height: 2},
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,
//             justifyContent: 'space-between',
//           },
//         ]}>
//         <View
//           style={{
//             paddingHorizontal: 36,

//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignSelf: 'center',
//           }}>
//           <HorizontalSpacer width={10} />
//           <View style={{paddingTop: 10}}>{getToastIcon()}</View>
//           <HorizontalSpacer width={15} />

//           <W500Text
//             title={message}
//             fontSize={15}
//             color={CustomColors.blackColor}
//           />
//         </View>

//         <VerticalSpacer height={17} />

//         <View style={styles.progressBarBackground}>
//           <Animated.View
//             style={[
//               styles.progressBarFill,
//               {
//                 width: progress.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: ['0%', '100%'],
//                 }),
//                 height: 100,
//                 backgroundColor: getProgressColor(),
//               },
//             ]}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const toastConfig = {
//   customToast: ({text1, props}) => (
//     <ToastContent
//       key={Date.now()}
//       message={text1}
//       status={props.status}
//       duration={props.duration}
//     />
//   ),
// };

// const screenWidth = Dimensions.get('window').width;

// const showToast = (status, message) => {
//   Toast.show({
//     type: 'customToast',
//     text1: message,
//     props: {status, duration: 4000},
//     position: 'top',
//     autoHide: true,
//     visibilityTime: 4000,
//     topOffset: 30,
//   });
// };

// const styles = StyleSheet.create({
//   toastContainer: {
//     paddingTop: 16,
//     borderRadius: 8,
//     marginHorizontal: 20,

//     alignItems: 'center',
//     justifyContent: 'center',
//     width: screenWidth - 50,
//   },

//   progressBarBackground: {
//     width: '100%',
//     height: 8,
//     backgroundColor: ColorUtils.hexToRgba(`${CustomColors.whiteColor}`, 0.3),

//     borderBottomRightRadius: 5,
//     borderBottomLeftRadius: 5,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: 8,
//     backgroundColor: 'yellow',
//     borderBottomRightRadius: 5,
//     borderBottomLeftRadius: 5,
//   },
// });

// export {showToast, toastConfig};

import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { CustomColors } from '../constants/CustomColors';
import { ToastStatus } from '../utils/enums';
import Toast from 'react-native-toast-message';
import { ColorUtils } from '../utils/colorUtils';
import { HorizontalSpacer, VerticalSpacer } from './Spacer';
import { W500Text } from './CustomText';
import ToastSuccessIcon from '../assets/icons/toast_success_icon.svg';
import ToastPendingIcon from '../assets/icons/toast_pending_icon.svg';
import ToastFailedIcon from '../assets/icons/toast_failed_icon.svg';
import React from 'react';

interface ToastContentProps {
  message: string;
  status: string;
  duration: number;
}

interface CustomToastProps {
  text1: string;
  props: any;
}

const ToastContent: React.FC<ToastContentProps> = ({
  message,
  status,
  duration,
}) => {
  const [progress] = useState(new Animated.Value(1));
  const [_, setIsPaused] = useState(false);
  const [remainingDuration, setRemainingDuration] = useState(duration || 4000);
  const startTime = useState(Date.now())[0];

  // useEffect(() => {
  //   progress.setValue(1);

  //   Animated.timing(progress, {
  //     toValue: 0,
  //     duration: duration || 4000,
  //     useNativeDriver: false,
  //   }).start();

  //   return () => progress.stopAnimation();
  // }, [progress, duration]);

  // useEffect(() => {
  //   startProgress();

  //   return () => progress.stopAnimation();
  // }, [progress]);

  // const startProgress = () => {
  //   Animated.timing(progress, {
  //     toValue: 0,
  //     duration: remainingDuration,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const pauseProgress = () => {
  //   progress.stopAnimation(currentValue => {
  //     const elapsed = Date.now() - startTime;
  //     setRemainingDuration(duration - elapsed);
  //     setIsPaused(true);
  //   });
  // };

  // const resumeProgress = () => {
  //   setIsPaused(false);
  //   startProgress();
  // };

  useEffect(() => {
    startProgress();

    return () => progress.stopAnimation();
  }, [progress]);

  const startProgress = () => {
    Animated.timing(progress, {
      toValue: 0,
      duration: remainingDuration,
      useNativeDriver: false,
    }).start();
  };

  const pauseProgress = () => {
    progress.stopAnimation((_) => {
      const elapsed = Date.now() - startTime;
      setRemainingDuration(duration - elapsed);
      setIsPaused(true);
    });
  };

  const resumeProgress = () => {
    setIsPaused(false);
    startProgress();
  };

  const getProgressColor = () => {
    switch (status) {
      case ToastStatus.success:
        return ColorUtils.hexToRgba(`${CustomColors.toastGreenColor}`, 0.7);
      case ToastStatus.pending:
        return ColorUtils.hexToRgba(`${CustomColors.toastOrangeColor}`, 0.7);
      case ToastStatus.failed:
      default:
        return ColorUtils.hexToRgba(`${CustomColors.toastRedColor}`, 0.7);
    }
  };

  const getToastIcon = () => {
    switch (status) {
      case ToastStatus.success:
        return <ToastSuccessIcon width={22} height={22} />;
      case ToastStatus.pending:
        return <ToastPendingIcon width={22} height={22} />;
      case ToastStatus.failed:
      default:
        return <ToastFailedIcon width={22} height={22} />;
    }
  };

  return (
    <View style={{}}>
      <Pressable onPressIn={pauseProgress} onPressOut={resumeProgress}>
        <View
          style={[
            styles.toastContainer,
            {
              backgroundColor: CustomColors.whiteColor,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              justifyContent: 'space-between',
            },
          ]}
        >
          <View
            style={{
              paddingHorizontal: 36,

              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <HorizontalSpacer width={10} />
            <View style={{ paddingTop: 10 }}>{getToastIcon()}</View>
            <HorizontalSpacer width={15} />

            <W500Text
              title={message}
              fontSize={15}
              color={CustomColors.blackColor}
            />
          </View>

          <VerticalSpacer height={17} />

          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                  height: 100,
                  backgroundColor: getProgressColor(),
                },
              ]}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const toastConfig = {
  customToast: ({ text1, props }: CustomToastProps) => (
    <ToastContent
      key={Date.now()}
      message={text1}
      status={props.status}
      duration={props.duration}
    />
  ),
};

const screenWidth = Dimensions.get('window').width;

const showToast = (_status: ToastStatus, message: string | undefined) => {
  // Toast.show({
  //   type: 'customToast',
  //   text1: message,
  //   props: {status, duration: 4000},
  //   position: 'top',
  //   autoHide: true,
  //   visibilityTime: 4000,
  //   topOffset: 30,
  // });

  Toast.show({
    type: 'customToast',
    text1: message,
    props: 4000, // default duration if not held
    position: 'top',
    topOffset: 50,
    autoHide: true,
    visibilityTime: 4000, // Update with remaining time if held
  });
};

const styles = StyleSheet.create({
  toastContainer: {
    paddingTop: 16,
    borderRadius: 8,
    marginHorizontal: 20,

    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - 50,
  },

  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: ColorUtils.hexToRgba(`${CustomColors.whiteColor}`, 0.3),

    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: 'yellow',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export { showToast, toastConfig };
