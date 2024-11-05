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
  getBounceTextName,
  getEndpointName,
  getVerificationStage,
  InspectionType,
  PhoneVerificationStep,
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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../utils/navigatorStackList';

const GadgetVerificationScreen = () => {
  const inspectionVM = InspectionViewModel();
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const clearGadgetImage = useInspectStore(
    (state: InspectStore) => state.clearGadgetImage
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

  const [verificationStep, setVerificationStep] =
    useState<PhoneVerificationStep>(PhoneVerificationStep.phoneFrontPreCapture);
  const [showText, setShowText] = useState(false);
  const [_timerActive, setTimerActive] = useState(false);
  const [verifiedCount, setVerifiedCount] = useState(0);

  const setGadgetImage = useInspectStore(
    (state: InspectStore) => state.setGadgetImage
  );

  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const animationController = useSharedValue(1);

  // Timer string logic
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

  useEffect(() => {
    if (device) {
      const lowRes = device.formats.find(
        (format) => format.videoWidth <= 640 && format.videoHeight <= 480
      );
      setLowResolutionFormat(lowRes);
    }
  }, [device]);

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
      // fileType: 'mp4',
      // videoCodec: 'h265',video
      fileType: 'mp4',
      videoBitRate: 'extra-low',
      onRecordingFinished: function (video) {
        const fileData: FileData = {
          uri: video.path ?? '',
          name: video.path,
        };
        console.log('jkdsn kdfljn dfjh ,jd k,df');
        console.log(fileData);

        // const videoFile = fileData;

        navigation.replace('GadgetInspectionSummaryScreen', {
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
      return PhoneVerificationStep.phoneFrontPreCapture;
    });
    setVerifiedCount(0);
    clearGadgetImage();
    controller.value = 1;
  };

  const handleVerification = useCallback(async () => {
    try {
      // setVerificationStep(prevStep => CarVerificationStep.verificationLoading);

      const currentStep = verificationStep;

      const fileData: FileData = {
        uri: imageFile ?? '',
        name: 'filety',
      };

      // const result = await inspectionVM.verifyInspectionImageAI({
      //   file: fileData,
      //   vehicleSection: getEndpointName(currentStep),
      //   loadingState: loadingState,
      //   policyId: globalObject.policyId ?? '',
      // });

      // setVerificationStep(prevStep => currentStep);

      setGadgetImage(getEndpointName(currentStep), fileData);

      updateVerificationStep();
    } catch (error) {
      console.log({ error });
    }
  }, [verificationStep, imageFile, loadingState, inspectionVM]);

  //DONE
  const updateVerifyToCaptureToStep = async () => {
    setVerificationStep((prevStep) => {
      switch (prevStep) {
        case PhoneVerificationStep.phoneFrontVerify:
          return PhoneVerificationStep.phoneFrontCapture;

        case PhoneVerificationStep.phoneBackVerify:
          return PhoneVerificationStep.phoneBackCapture;

        case PhoneVerificationStep.phoneSettingsVerify:
          return PhoneVerificationStep.phoneSettingsCapture;

        case PhoneVerificationStep.phoneSideVerify:
          return PhoneVerificationStep.phoneSideCapture;

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

  const updateVerificationStep = async () => {
    setVerificationStep((prevStep) => {
      switch (prevStep) {
        case PhoneVerificationStep.phoneFrontVerify:
          setVerifiedCount(1);
          setImageFile(null);
          return PhoneVerificationStep.phoneBackPreCapture;

        case PhoneVerificationStep.phoneBackVerify:
          setVerifiedCount(2);
          setImageFile(null);
          return PhoneVerificationStep.phoneSettingsPreCapture;

        case PhoneVerificationStep.phoneSettingsVerify:
          setVerifiedCount(3);
          setImageFile(null);
          return PhoneVerificationStep.phoneSidePreCapture;

        case PhoneVerificationStep.phoneSideVerify:
          setVerifiedCount(4);
          setImageFile(null);

        default:
          console.error(`Unknown verification step: ${prevStep}`);
          return prevStep;
      }
    });

    if (verificationStep === PhoneVerificationStep.phoneSideVerify) {
      stopTimer();
      await stopVideoRecording();
      // console.log('Video stopped, file:', videoFile);
      // console.log('getEndpointName(currentStep)', videoFile);
      // console.log(videoFile);
    }
  };

  //DONE
  const updatePreCaptureToCaptureStep = () => {
    setVerificationStep((prevStep) => {
      switch (prevStep) {
        case PhoneVerificationStep.phoneFrontPreCapture:
          return PhoneVerificationStep.phoneFrontCapture;
        case PhoneVerificationStep.phoneBackPreCapture:
          return PhoneVerificationStep.phoneBackCapture;

        case PhoneVerificationStep.phoneSettingsPreCapture:
          return PhoneVerificationStep.phoneSettingsCapture;

        case PhoneVerificationStep.phoneSidePreCapture:
          return PhoneVerificationStep.phoneSideCapture;

        default:
          console.error(`Unknown verification step: ${prevStep}`);
          return prevStep;
      }
    });
  };

  //DONE
  const updateCaptureToVerifyStep = () => {
    setVerificationStep((prevStep) => {
      switch (prevStep) {
        case PhoneVerificationStep.phoneFrontCapture:
          return PhoneVerificationStep.phoneFrontVerify;

        case PhoneVerificationStep.phoneBackCapture:
          return PhoneVerificationStep.phoneBackVerify;

        case PhoneVerificationStep.phoneSettingsCapture:
          return PhoneVerificationStep.phoneSettingsVerify;

        case PhoneVerificationStep.phoneSideCapture:
          return PhoneVerificationStep.phoneSideVerify;

        default:
          console.error(`Unknown capture step: ${prevStep}`);
          return prevStep;
      }
    });
  };

  const renderVerificationStep = (step: PhoneVerificationStep) => {
    switch (getVerificationStage(step)) {
      case VerificationStage.capture:
        return (
          <View style={styles.contentContainer}>
            <CountdownTimer
              controller={controller}
              resetTimer={resetVerificationStates}
              verificationStep={verifiedCount}
              inspectionType={InspectionType.gadget}
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
              inspectionType={InspectionType.gadget}
              // timerColor="white"
            />
            <SelectedImageContainer
              imageFile={imageFile}
              aspectRatio={16 / 9}
            />
            <VerifySideContainer
              step={step}
              // imageFile={imageFile}
              inspectionType={InspectionType.gadget}
              onReCaptureTap={handleRecapture}
              onVerifyTap={handleVerification}
            />
          </View>
        );
      case VerificationStage.loading:
        return <LoadingSideContainer />;
      default:
        return (
          <StartSideContainer
            inspectionType={InspectionType.gadget}
            step={step}
            onTap={startTimer}
          />
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

export default GadgetVerificationScreen;
