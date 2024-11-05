// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import {
  Camera,
  type CameraDeviceFormat,
  useCameraDevice,
} from 'react-native-vision-camera';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import CountdownTimer from '../components/CountdownTimer';
import SelectedImageContainer from '../components/SelectedImageContainer';
import CaptureSideContainer from '../components/CaptureSideContainer';
import VerifySideContainer from '../components/VerifySideContainer';
import LoadingSideContainer from '../components/LoadingSideContainer';
import StartSideContainer from '../components/StartSideContainer';
import {
  CarVerificationStep,
  getBounceTextName,
  getEndpointName,
  getVerificationStage,
  InspectionType,
  VerificationStage,
} from '../../../utils/enums';
import Orientation from 'react-native-orientation-locker';
import { InspectionViewModel } from '../InspectionViewModel';
import type { FileData } from '../../purchase/form/components/CustomImagePicker';
import { type LoadStore, useLoadStore } from '../../../store/loadStore';
import { useNavigation } from '@react-navigation/native';
import {
  type InspectStore,
  useInspectStore,
} from '../../../store/inspectStore';
import globalObject from '../../../store/globalObject';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../utils/navigatorStackList';

const VehicleVerificationScreen = () => {
  const inspectionVM = InspectionViewModel();
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const clearVehicleImageUrl = useInspectStore(
    (state: InspectStore) => state.clearVehicleImageUrl
  );
  const clearVehicleImage = useInspectStore(
    (state: InspectStore) => state.clearVehicleImage
  );
  const loadingState = useLoadStore((state: LoadStore) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [imageFile, setImageFile] = useState<string | null>(null);
  // const [videoFile, setVideoFile] = useState<string | null>(null);
  const controller = useSharedValue(1);
  const [lowResolutionFormat, setLowResolutionFormat] = useState<
    CameraDeviceFormat | undefined
  >();

  const [verificationStep, setVerificationStep] = useState<CarVerificationStep>(
    CarVerificationStep.frontSidePreCapture
  );
  const [showText, setShowText] = useState(false);
  const [_timerActive, setTimerActive] = useState(false);
  const [verifiedCount, setVerifiedCount] = useState(0);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const animationController = useSharedValue(1);

  useEffect(() => {
    if (device) {
      const lowRes = device.formats.find(
        (format) => format.videoWidth <= 640 && format.videoHeight <= 480
      );
      setLowResolutionFormat(lowRes);
    }
  }, [device]);

  // // Timer string logic
  // const timerString = () => {
  //   const duration = animationController.value;
  //   const minutes = Math.floor(duration / 60);
  //   const seconds = duration % 60;

  //   return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  // };

  useEffect(() => {
    // Lock the screen orientation to landscape mode when the component is mounted
    Orientation.lockToLandscape();

    return () => {
      // Unlock the orientation back to the default when the component is unmounted
      Orientation.unlockAllOrientations();
    };
  }, []);

  // useEffect(() => {
  //   if (device) {
  //     const lowRes = device.formats.find(
  //       format => format.videoWidth <= 640 && format.videoHeight <= 480,
  //     );
  //     setLowResolutionFormat(lowRes);
  //   }
  // }, [device]);

  useEffect(() => {
    console.log(`Verification step updated: ${verificationStep}`);
  }, [verificationStep]);

  useEffect(() => {
    console.log(`Verification step updated: ${verificationStep}`);
  }, [verificationStep]);

  const startVideoRecording = async () => {
    if (!camera.current || isRecording) return;
    setIsRecording(true);
    await camera.current.startRecording({
      fileType: 'mp4',

      videoBitRate: 'extra-low',
      onRecordingFinished: function (video) {
        const fileData: FileData = {
          uri: video.path ?? '',
          name: video.path,
        };
        navigation.replace('VehicleInspectionSummaryScreen', {
          videoFile: fileData,
        });
      },

      onRecordingError: (error) => console.error(error),
    });
  };

  const stopVideoRecording = async () => {
    if (!camera.current || !isRecording) return;
    await camera.current.stopRecording();
    setIsRecording(false);
  };

  const startTimer = async () => {
    updatePreCaptureToCaptureStep();
    startTimerController();
    setTimerActive(true);
    animationController.value = withTiming(300, { duration: 300000 }); // 5 minutes timer
    await startVideoRecording();
  };

  const startTimerController = () => {
    controller.value = withTiming(0, { duration: 300000 }); // 300000ms = 5 minutes
  };
  const stopTimer = () => {
    controller.value = controller.value;
  };

  const handleBouncingText = () => {
    setShowText(true);
    setTimeout(() => setShowText(false), 3000);
  };

  const handleRecapture = () => {
    setImageFile(null);
    // console.log(imageFile);
    updateVerifyToCaptureToStep();
    setShowText(true);
    setTimeout(() => setShowText(false), 3000);
  };

  const resetVerificationStates = () => {
    setImageFile(null);
    setVerificationStep((_prevStep) => {
      return CarVerificationStep.frontSidePreCapture;
    });
    setVerifiedCount(0);
    clearVehicleImageUrl();
    clearVehicleImage();
    controller.value = 1;
  };

  const handleVerification = useCallback(async () => {
    try {
      setVerificationStep(
        (_prevStep) => CarVerificationStep.verificationLoading
      );

      const currentStep = verificationStep;

      const fileData: FileData = {
        uri: imageFile ?? '',
        name: 'filety',
      };

      const result = await inspectionVM.verifyInspectionImageAI({
        file: fileData,
        vehicleSection: getEndpointName(currentStep),

        policyId: globalObject.policyId ?? '',
        claimId: globalObject.claimId ?? '',
      });

      setVerificationStep((_prevStep) => currentStep);

      updateVerificationStep(result);
    } catch (error) {
      console.log({ error });
    }
  }, [verificationStep, imageFile, loadingState, inspectionVM]);

  const updateVerifyToCaptureToStep = async () => {
    setVerificationStep((prevStep) => {
      switch (prevStep) {
        case CarVerificationStep.frontSideVerify:
        case CarVerificationStep.frontSideFailed:
          return CarVerificationStep.frontSideCapture;

        case CarVerificationStep.chasisNumberVerify:
        case CarVerificationStep.chasisNumberFailed:
          return CarVerificationStep.chasisNumberCapture;

        case CarVerificationStep.leftSideVerify:
        case CarVerificationStep.leftSideFailed:
          return CarVerificationStep.leftSideCapture;

        case CarVerificationStep.backSideVerify:
        case CarVerificationStep.backSideFailed:
          return CarVerificationStep.backSideCapture;

        case CarVerificationStep.rightSideVerify:
        case CarVerificationStep.rightSideFailed:
          return CarVerificationStep.rightSideCapture;

        case CarVerificationStep.dashboardVerify:
        case CarVerificationStep.dashboardFailed:
          return CarVerificationStep.dashboardCapture;

        case CarVerificationStep.interiorVerify:
        case CarVerificationStep.interiorFailed:
          return CarVerificationStep.interiorCapture;

        default:
          console.error(`Unknown verification step: ${prevStep}`);
          return prevStep;
      }
    });
  };

  const handleOnCapture = useCallback(async () => {
    try {
      setIsLoading(true);
      if (camera && camera.current) {
        const image = await camera.current.takePhoto({
          // quality: 100,
        });

        setImageFile(`file://${image?.path}`);
        setIsLoading(false);
        handleBouncingText();

        updateCaptureToVerifyStep();
      }
    } catch (error) {
      console.log({ error });
    }
  }, [camera]);

  const updateVerificationStep = async (status: boolean) => {
    setVerificationStep((prevStep) => {
      switch (prevStep) {
        case CarVerificationStep.frontSideVerify:
          if (status) {
            setVerifiedCount(1);
            setImageFile(null);
            return CarVerificationStep.chasisNumberPreCapture;
          } else {
            return CarVerificationStep.frontSideFailed;
          }

        case CarVerificationStep.chasisNumberVerify:
          if (status) {
            setVerifiedCount(2);
            setImageFile(null);
            return CarVerificationStep.leftSidePreCapture;
          } else {
            return CarVerificationStep.chasisNumberFailed;
          }

        case CarVerificationStep.leftSideVerify:
          if (status) {
            setVerifiedCount(3);
            setImageFile(null);
            return CarVerificationStep.backSidePreCapture;
          } else {
            return CarVerificationStep.leftSideFailed;
          }

        case CarVerificationStep.backSideVerify:
          if (status) {
            setVerifiedCount(4);
            setImageFile(null);
            return CarVerificationStep.rightSidePreCapture;
          } else {
            return CarVerificationStep.backSideFailed;
          }

        case CarVerificationStep.rightSideVerify:
          if (status) {
            setVerifiedCount(5);
            setImageFile(null);
            return CarVerificationStep.dashboardPreCapture;
          } else {
            return CarVerificationStep.rightSideFailed;
          }

        case CarVerificationStep.dashboardVerify:
          if (status) {
            setVerifiedCount(6);
            setImageFile(null);
            return CarVerificationStep.interiorPreCapture;
          } else {
            return CarVerificationStep.dashboardFailed;
          }

        case CarVerificationStep.interiorVerify:
          if (status) {
            setVerifiedCount(7);
            setImageFile(null);
          } else {
            return CarVerificationStep.interiorFailed;
          }

        default:
          console.error(`Unknown verification step: ${prevStep}`);
          return prevStep;
      }
    });

    if (status && verificationStep === CarVerificationStep.interiorVerify) {
      stopTimer();
      await stopVideoRecording();
      // console.log('Video stopped, file:', videoFile);
      // console.log('getEndpointName(currentStep)', videoFile);
      // console.log(videoFile);
    }
  };

  const updatePreCaptureToCaptureStep = () => {
    setVerificationStep((prevStep) => {
      switch (prevStep) {
        case CarVerificationStep.frontSidePreCapture:
          return CarVerificationStep.frontSideCapture;
        case CarVerificationStep.chasisNumberPreCapture:
          return CarVerificationStep.chasisNumberCapture;
        case CarVerificationStep.leftSidePreCapture:
          return CarVerificationStep.leftSideCapture;
        case CarVerificationStep.backSidePreCapture:
          return CarVerificationStep.backSideCapture;
        case CarVerificationStep.rightSidePreCapture:
          return CarVerificationStep.rightSideCapture;
        case CarVerificationStep.dashboardPreCapture:
          return CarVerificationStep.dashboardCapture;
        case CarVerificationStep.interiorPreCapture:
          return CarVerificationStep.interiorCapture;
        default:
          console.error(`Unknown verification step: ${prevStep}`);
          return prevStep;
      }
    });
  };

  const updateCaptureToVerifyStep = () => {
    setVerificationStep((prevStep) => {
      switch (prevStep) {
        case CarVerificationStep.frontSideCapture:
          return CarVerificationStep.frontSideVerify;
        case CarVerificationStep.chasisNumberCapture:
          return CarVerificationStep.chasisNumberVerify;
        case CarVerificationStep.leftSideCapture:
          return CarVerificationStep.leftSideVerify;
        case CarVerificationStep.backSideCapture:
          return CarVerificationStep.backSideVerify;
        case CarVerificationStep.rightSideCapture:
          return CarVerificationStep.rightSideVerify;
        case CarVerificationStep.dashboardCapture:
          return CarVerificationStep.dashboardVerify;
        case CarVerificationStep.interiorCapture:
          return CarVerificationStep.interiorVerify;
        default:
          console.error(`Unknown capture step: ${prevStep}`);
          return prevStep;
      }
    });
  };

  const renderVerificationStep = (step: CarVerificationStep) => {
    switch (getVerificationStage(step)) {
      case VerificationStage.capture:
        return (
          <View style={styles.contentContainer}>
            <CountdownTimer
              controller={controller}
              resetTimer={resetVerificationStates}
              verificationStep={verifiedCount}
              inspectionType={InspectionType.vehicle}
              // timerColor="white"
            />
            <SelectedImageContainer
              imageFile={imageFile}
              aspectRatio={16 / 9}
            />
            <CaptureSideContainer
              isLoading={isLoading}
              onTap={handleOnCapture}
            />
          </View>
        );
      case VerificationStage.verify:
      case VerificationStage.failed:
        return (
          <View style={styles.verifyContentContainer}>
            <CountdownTimer
              controller={controller}
              resetTimer={resetVerificationStates}
              verificationStep={verifiedCount}
              inspectionType={InspectionType.vehicle}
              // timerColor="white"
            />
            <SelectedImageContainer
              imageFile={imageFile}
              aspectRatio={16 / 9}
            />
            <VerifySideContainer
              step={step}
              // imageFile={imageFile}
              inspectionType={InspectionType.vehicle}
              onReCaptureTap={handleRecapture}
              onVerifyTap={handleVerification}
            />
          </View>
        );
      case VerificationStage.loading:
        return (
          <View style={styles.newContentContainer}>
            <CountdownTimer
              controller={controller}
              resetTimer={resetVerificationStates}
              verificationStep={verifiedCount}
              inspectionType={InspectionType.vehicle}
              // timerColor="white"
            />
            <SelectedImageContainer imageFile={null} aspectRatio={16 / 9} />
            <LoadingSideContainer />
          </View>
        );
      default:
        return (
          <View style={styles.newContentContainer}>
            <CountdownTimer
              controller={controller}
              resetTimer={resetVerificationStates}
              verificationStep={verifiedCount}
              inspectionType={InspectionType.vehicle}
              // timerColor="white"
            />
            <SelectedImageContainer imageFile={null} aspectRatio={16 / 9} />
            <StartSideContainer
              inspectionType={InspectionType.vehicle}
              step={step}
              onTap={startTimer}
            />
          </View>
        );
    }
  };

  const bounceTextAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(showText ? -10 : 0, { duration: 800 }) },
      ],
    };
  });

  if (!device) {
    return <Text>Loading Camera...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        photo={true}
        audio={false}
        videoHdr={false}
        format={lowResolutionFormat}
      />
      {renderVerificationStep(verificationStep)}

      {showText && (
        <Animated.View
          style={[styles.bounceTextContainer, bounceTextAnimationStyle]}
        >
          <Text style={styles.bounceText}>
            {getBounceTextName(VerificationStage.capture)[1]}
          </Text>
        </Animated.View>
      )}

      {/* {videoFile && (
        <Modal transparent={true} visible={!!videoFile}>
          <View style={styles.modalContainer}>
            <Text>Recording Complete!</Text>
            <TouchableOpacity
              onPress={() => {
                console.log('hfhfhhfhfhff', videoFile);
                console.log('hfhfhhfhfhff', videoFile);
                console.log('hfhfhhfhfhff', videoFile);
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  newContentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verifyContentContainer: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
  },
  bounceTextContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  bounceText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});

export default VehicleVerificationScreen;
