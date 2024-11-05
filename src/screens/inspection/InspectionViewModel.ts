import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import { type InspectStore, useInspectStore } from '../../store/inspectStore';
import {
  CarVerificationStep,
  PhoneVerificationStep,
  ToastStatus,
  TransactionType,
} from '../../utils/enums';
import type { FileData } from '../purchase/form/components/CustomImagePicker';
import InspectionRepository from '../../data/repositories/inspection_repo';

import ClaimRepository from '../../data/repositories/claim_repo';
import { InspectionModel } from '../../models/InspectionModel';
import GenericResponse from '../../data/api/GenericResponse';
import FileRepository from '../../data/repositories/file_repo';
import globalObject from '../../store/globalObject';
import { showToast } from '../../components/CustomToast';

const fileRepository = new FileRepository();
const inspectionRepository = new InspectionRepository();
const claimRepository = new ClaimRepository();

interface VerifyInspectionImageAIProps {
  file: FileData;
  vehicleSection: string;
  claimId?: string;
  policyId?: string;
}

interface SubmitAutoInspectionProps {
  vehicleImages: Record<string, FileData>;

  videoUrl: string;
  address: string;
  longitude: string;
  latitude: string;
  inspectionType: string;
  timeStamp: string;
  policyId?: string;
  reference?: string;
}
interface SubmitGadgetInspectionProps {
  gadgetImages: Record<string, FileData>;

  videoUrl: string;
  address: string;
  longitude: string;
  latitude: string;
  inspectionType: string;
  timeStamp: string;
  policyId?: string;
  reference?: string;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const InspectionViewModel = () => {
  const inspectStore = useInspectStore((state: InspectStore) => state);
  // const globalInspect = useInspectStore((state: InspectStore) => state);
  let {
    verificationStep,
    setVerificationStep,
    phoneVerificationStep,
    setPhoneVerificationStep,
    setVerifiedCount,
  } = useInspectStore();

  // const verificationStep = useInspectStore(state => state.verificationStep);
  // const setVerificationStep = useInspectStore(
  //   state => state.setVerificationStep,
  // );

  const navigation = useNavigation<NavigationProps>();

  const verifyInspectionImageAI = async ({
    file,
    vehicleSection,
    claimId,
    policyId,
  }: VerifyInspectionImageAIProps): Promise<boolean> => {
    // const [isLoading, setIsLoading] = useState(false);
    // const { vehicleImageUrl, setVehicleImageUrl } = useContext(VehicleImageContext); // Assume you're using context
    // const { retryCount, setRetryCount } = useState(0); // Assume you're using context

    try {
      // Call your repository function
      const res = await inspectionRepository.verifyImageAI({
        file,
        action:
          globalObject.transactionType == TransactionType.claim
            ? 'claim'
            : 'inspection',
        vehicleSection,
        policyId,
        bypass: inspectStore.retryCount > 1 ? true : false, // Adjust based on retryCount
        claimId,
      });

      if (res.data) {
        const data = res.data;

        // Check for valid image and URL
        if (
          data.is_valid_image === true &&
          data.image_url &&
          data.image_url.length > 0
        ) {
          // loadingState.setInspectVmLoading(false);

          inspectStore.setVehicleImageUrl(vehicleSection, data['image_url']);
          inspectStore.setVehicleImage(vehicleSection, file);

          // Reset retry count
          inspectStore.setRetryCount(0);

          return true;
        } else {
          // Increment retry count if the image isn't valid
          const newCount = inspectStore.retryCount + 1;
          inspectStore.setRetryCount(newCount);
          // loadingState.setInspectVmLoading(false);
          return false;
        }
      } else {
        // No data received, increment retry count
        const newCount = inspectStore.retryCount + 1;
        inspectStore.setRetryCount(newCount);
        // loadingState.setInspectVmLoading(false);
        return false;
      }
    } catch (error) {
      // loadingState.setInspectVmLoading(false);

      // Show toast message with the error
      showToast(
        ToastStatus.failed,
        'An error occurred during the verification process'
      );

      return false;
    }
  };

  const submitAutoInspection = async ({
    vehicleImages,

    videoUrl,
    address,
    longitude,
    latitude,
    inspectionType,
    timeStamp,
    policyId,
    reference,
  }: SubmitAutoInspectionProps): Promise<void> => {
    try {
      // loadingState.setInspectVmLoading(true);

      // Call your repository function
      const res =
        globalObject.transactionType == TransactionType.claim
          ? await claimRepository.submitAutoClaimInspection({
              vehicleImages: vehicleImages,
              videoUrl: videoUrl ?? '',
              address: address,
              longitude: longitude,
              latitude: latitude,
              inspectionType: inspectionType,
              timeStamp: timeStamp,
              policyId: policyId,
              // reference:reference,
              claimId: globalObject.claimId ?? '',
            })
          : await claimRepository.submitAutoInspection({
              vehicleImages,
              videoUrl,
              address,
              longitude,
              latitude,
              inspectionType,
              timeStamp,
              policyId,
              reference,
            });

      if (res.responseCode == 1) {
        // const data = res.data;

        const inspection = InspectionModel.fromJson(res.data);

        navigation.replace('InspectionSuccessScreen', {
          inspection,
        });

        // Navigator.push(
        //     context,
        //     MaterialPageRoute(
        //         builder: (context) =>
        //             InspectionSuccessScreenScreen(inspection: policy)));

        // showToast(ToastStatus.failed, 'Doneeee');
      } else {
        // loadingState.setInspectVmLoading(false);

        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;
        showToast(
          ToastStatus.failed,

          errorMessage
        );
      }
    } catch (error) {
      // loadingState.setInspectVmLoading(false);

      // Show toast message with the error
      showToast(
        ToastStatus.failed,
        'An error occurred during the verification process'
      );
    }
  };

  const submitGadgetInspection = async ({
    gadgetImages,

    videoUrl,
    address,
    longitude,
    latitude,
    inspectionType,
    timeStamp,
    policyId,
    reference,
  }: SubmitGadgetInspectionProps): Promise<void> => {
    try {
      const maxRetries = 3;
      // loadingState.setInspectVmLoading(true);

      const results = await Promise.all([
        uploadWithRetry(gadgetImages['front']!, maxRetries),
        uploadWithRetry(gadgetImages['back']!, maxRetries),
        uploadWithRetry(gadgetImages['side']!, maxRetries),
        uploadWithRetry(gadgetImages['settings']!, maxRetries),
      ]);

      const resOne = results[0];
      const resTwo = results[1];
      const resThree = results[2];
      const resFour = results[3];

      const frontImage = resOne.data['file_url'];
      const backImage = resTwo.data['file_url'];
      const sideImage = resThree.data['file_url'];
      const serialNumberImage = resFour.data['file_url'];
      const claimId = globalObject.claimId ?? '';
      const policyNumber = globalObject.policyNumber ?? '';

      // Call your repository function
      const res =
        globalObject.transactionType == TransactionType.claim
          ? await claimRepository.submitGadgetClaimInspection({
              videoUrl,
              address,
              longitude,
              latitude,
              frontImage,
              backImage,
              sideImage,
              serialNumberImage,

              claimId,
              policyNumber,

              inspectionType,
              timeStamp,
              policyId,
              reference,
            })
          : await claimRepository.submitGadgetInspection({
              videoUrl,
              address,
              longitude,
              latitude,
              frontImage,
              backImage,
              sideImage,
              serialNumberImage,

              inspectionType,
              timeStamp,
              policyId,
              reference,
            });

      if (res.responseCode == 1) {
        // const data = res.data;

        const inspection = InspectionModel.fromJson(res.data);

        navigation.replace('InspectionSuccessScreen', {
          inspection,
        });

        // Navigator.push(
        //     context,
        //     MaterialPageRoute(
        //         builder: (context) =>
        //             InspectionSuccessScreenScreen(inspection: policy)));

        // showToast(ToastStatus.failed, 'Doneeee');
      } else {
        // loadingState.setInspectVmLoading(false);
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;
        showToast(
          ToastStatus.failed,

          errorMessage
        );
      }
    } catch (error) {
      // loadingState.setInspectVmLoading(false);

      // Show toast message with the error
      console.log(error);
      showToast(
        ToastStatus.failed,
        'An error occurred during the verification process'
      );
    }
  };

  const uploadWithRetry = async (
    file: FileData,
    maxRetries: number
  ): Promise<GenericResponse> => {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const res = await fileRepository.uploadFile(file!);

        if (res.responseCode === 1) {
          return res; // Success
        }
      } catch (error) {
        console.error(`Attempt ${attempts + 1} failed: ${error}`);
      }
      attempts++;
    }
    throw new Error(`Failed to upload file after ${maxRetries} attempts`);
  };

  /////BELOW NOT NEEDED

  const updatePreCaptureToCaptureStep = async () => {
    const currentStep = verificationStep;

    switch (currentStep) {
      case CarVerificationStep.frontSidePreCapture:
        setVerificationStep(CarVerificationStep.frontSideCapture);

        break;

      case CarVerificationStep.chasisNumberPreCapture:
        setVerificationStep(CarVerificationStep.chasisNumberCapture);
        break;

      case CarVerificationStep.leftSidePreCapture:
        setVerificationStep(CarVerificationStep.leftSideCapture);
        break;

      case CarVerificationStep.backSidePreCapture:
        setVerificationStep(CarVerificationStep.backSideCapture);
        break;

      case CarVerificationStep.rightSidePreCapture:
        setVerificationStep(CarVerificationStep.rightSideCapture);
        break;

      case CarVerificationStep.dashboardPreCapture:
        setVerificationStep(CarVerificationStep.dashboardCapture);
        break;

      case CarVerificationStep.interiorPreCapture:
        setVerificationStep(CarVerificationStep.interiorCapture);
        break;

      default:
        // You can add a default case to handle unexpected values, if necessary
        console.error(`Unknown verification step: ${currentStep}`);
        break;
    }
  };

  const updateCaptureToVerifyStep = async () => {
    const currentStep = verificationStep;

    switch (currentStep) {
      case CarVerificationStep.frontSideCapture:
        setVerificationStep(CarVerificationStep.frontSideVerify);
        break;

      case CarVerificationStep.chasisNumberCapture:
        setVerificationStep(CarVerificationStep.chasisNumberVerify);
        break;

      case CarVerificationStep.leftSideCapture:
        setVerificationStep(CarVerificationStep.leftSideVerify);
        break;

      case CarVerificationStep.backSideCapture:
        setVerificationStep(CarVerificationStep.backSideVerify);
        break;

      case CarVerificationStep.rightSideCapture:
        setVerificationStep(CarVerificationStep.rightSideVerify);
        break;

      case CarVerificationStep.dashboardCapture:
        setVerificationStep(CarVerificationStep.dashboardVerify);
        break;

      case CarVerificationStep.interiorCapture:
        setVerificationStep(CarVerificationStep.interiorVerify);
        break;

      default:
        console.error(`Unknown capture step: ${currentStep}`);
        break;
    }
  };

  const updateVerifyToCaptureToStep = async () => {
    const currentStep = verificationStep;

    switch (currentStep) {
      case CarVerificationStep.frontSideVerify:
      case CarVerificationStep.frontSideFailed:
        setVerificationStep(CarVerificationStep.frontSideCapture);
        break;

      case CarVerificationStep.chasisNumberVerify:
      case CarVerificationStep.chasisNumberFailed:
        setVerificationStep(CarVerificationStep.chasisNumberCapture);
        break;

      case CarVerificationStep.leftSideVerify:
      case CarVerificationStep.leftSideFailed:
        setVerificationStep(CarVerificationStep.leftSideCapture);
        break;

      case CarVerificationStep.backSideVerify:
      case CarVerificationStep.backSideFailed:
        setVerificationStep(CarVerificationStep.backSideCapture);
        break;

      case CarVerificationStep.rightSideVerify:
      case CarVerificationStep.rightSideFailed:
        setVerificationStep(CarVerificationStep.rightSideCapture);
        break;

      case CarVerificationStep.dashboardVerify:
      case CarVerificationStep.dashboardFailed:
        setVerificationStep(CarVerificationStep.dashboardCapture);
        break;

      case CarVerificationStep.interiorVerify:
      case CarVerificationStep.interiorFailed:
        setVerificationStep(CarVerificationStep.interiorCapture);
        break;

      default:
        console.error(`Unknown verification step: ${currentStep}`);
        break;
    }
  };

  /////GADGET

  const updateGadgetPreCaptureToCaptureStep = async () => {
    if (phoneVerificationStep === PhoneVerificationStep.phoneFrontPreCapture) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneFrontCapture);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneBackPreCapture
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneBackCapture);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneSettingsPreCapture
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneSettingsCapture);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneSidePreCapture
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneSideCapture);
    }
  };

  const updateGadgetCaptureToVerifyStep = async () => {
    if (phoneVerificationStep === PhoneVerificationStep.phoneFrontCapture) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneFrontVerify);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneBackCapture
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneBackVerify);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneSettingsCapture
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneSettingsVerify);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneSideCapture
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneSideVerify);
    }
  };

  const updateGadgetVerificationStep = async () => {
    if (phoneVerificationStep === PhoneVerificationStep.phoneFrontVerify) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneBackPreCapture);
      setVerifiedCount(1);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneBackVerify
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneSettingsPreCapture);
      setVerifiedCount(2);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneSettingsVerify
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneSidePreCapture);
      setVerifiedCount(3);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneSideVerify
    ) {
      // const videoFile = stopVideo ? await stopVideo() : null;
      setVerifiedCount(4);

      // if (videoFile) {
      //   // Navigate to GadgetInspectionSummaryScreen and pass the video file
      //   navigation.replace('GadgetInspectionSummary', { videoFile });
      // }
    }
  };

  const updateGadgetVerifyToCaptureToStep = async () => {
    if (phoneVerificationStep === PhoneVerificationStep.phoneFrontVerify) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneFrontCapture);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneBackVerify
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneBackCapture);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneSettingsVerify
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneSettingsCapture);
    } else if (
      phoneVerificationStep === PhoneVerificationStep.phoneSideVerify
    ) {
      setPhoneVerificationStep(PhoneVerificationStep.phoneSideCapture);
    }

    // Function to update verification step based on status
  };

  // const updateVerificationStep = async (status: boolean, file: FileData) => {
  const updateVerificationStep = async (status: boolean) => {
    const currentStep = verificationStep;

    setVerificationStep(CarVerificationStep.verificationLoading);

    if (status) {
      if (currentStep === CarVerificationStep.frontSideVerify) {
        setVerificationStep(CarVerificationStep.chasisNumberPreCapture);
        setVerifiedCount(1);
      } else if (currentStep === CarVerificationStep.chasisNumberVerify) {
        setVerificationStep(CarVerificationStep.leftSidePreCapture);
        setVerifiedCount(2);
      } else if (currentStep === CarVerificationStep.leftSideVerify) {
        setVerificationStep(CarVerificationStep.backSidePreCapture);
        setVerifiedCount(3);
      } else if (currentStep === CarVerificationStep.backSideVerify) {
        setVerificationStep(CarVerificationStep.rightSidePreCapture);
        setVerifiedCount(4);
      } else if (currentStep === CarVerificationStep.rightSideVerify) {
        setVerificationStep(CarVerificationStep.dashboardPreCapture);
        setVerifiedCount(5);
      } else if (currentStep === CarVerificationStep.dashboardVerify) {
        setVerificationStep(CarVerificationStep.interiorPreCapture);
        setVerifiedCount(6);
      } else if (currentStep === CarVerificationStep.interiorVerify) {
        // const video = stopVideo ? await stopVideo() : null;
        setVerificationStep(CarVerificationStep.verificationCompleted);
        setVerifiedCount(7);
        // if (video) {
        //   navigation.replace('VeicleInspectionSummaryScreen', { videoFile: video });
        // }
      }
    } else {
      if (currentStep === CarVerificationStep.frontSideVerify) {
        setVerificationStep(CarVerificationStep.frontSideFailed);
      } else if (currentStep === CarVerificationStep.chasisNumberVerify) {
        setVerificationStep(CarVerificationStep.chasisNumberFailed);
      } else if (currentStep === CarVerificationStep.leftSideVerify) {
        setVerificationStep(CarVerificationStep.leftSideFailed);
      } else if (currentStep === CarVerificationStep.backSideVerify) {
        setVerificationStep(CarVerificationStep.backSideFailed);
      } else if (currentStep === CarVerificationStep.rightSideVerify) {
        setVerificationStep(CarVerificationStep.rightSideFailed);
      } else if (currentStep === CarVerificationStep.dashboardVerify) {
        setVerificationStep(CarVerificationStep.dashboardFailed);
      } else {
        setVerificationStep(CarVerificationStep.interiorFailed);
      }
    }
  };

  return {
    verifyInspectionImageAI,
    submitAutoInspection,
    submitGadgetInspection,
    updatePreCaptureToCaptureStep,
    updateCaptureToVerifyStep,

    updateVerificationStep,
    updateGadgetPreCaptureToCaptureStep,
    updateGadgetCaptureToVerifyStep,
    updateGadgetVerificationStep,
    updateGadgetVerifyToCaptureToStep,
    updateVerifyToCaptureToStep,
  };
};
