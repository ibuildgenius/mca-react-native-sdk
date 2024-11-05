import { useNavigation } from '@react-navigation/native';

import ClaimRepository, {
  type InitialGadgetClaimData,
  type InitialTravelClaimData,
  type ThirdPartyClaimData,
  type VehicleClaimData,
} from '../../data/repositories/claim_repo';
import { ClaimSubmissionStep, ClaimType, ToastStatus } from '../../utils/enums';
import { PolicyModel } from '../../models/PolicyModel';
import type { FileData } from '../purchase/form/components/CustomImagePicker';
import { ProductDetailsModel } from '../../models/ProductDetailsModel';
import { ClaimModel } from '../../models/ClaimModel';
import GenericResponse from '../../data/api/GenericResponse';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { LoadStore } from '../../store/loadStore';
import globalObject from '../../store/globalObject';
import ProductRepository from '../../data/repositories/product_repo';
import FileRepository from '../../data/repositories/file_repo';
import type { ClaimStore } from '../../store/claimStore';
import { BankModel } from '../../models/BankModel';
import { BankAccountModel } from '../../models/BankAccountModel';
import { showToast } from '../../components/CustomToast';
import { GlobalStore } from '../../store/globalStore';
// import type { GlobalStore } from 'store/globalStore';

// interface ClaimStoreState {
//   isLoading: boolean;
//   isNameLoading: boolean;
//   isImageUploading: boolean;
//   incidentTypeList: string[];
//   bankList: BankModel[];
//   accountDetails: BankAccountModel | null;
// }

// interface ClaimStoreActions {
//   setIsLoading: (loading: boolean) => void;
//   setIsNameLoading: (loading: boolean) => void;
//   setIsImageUploading: (uploading: boolean) => void;
//   setIncidentTypeList: (incidentTypeList: string[]) => void;
//   setBankList: (bankList: BankModel[]) => void;
//   setAccountDetails: (accountDetails: BankAccountModel | null) => void;
// }

// export const useClaimStore = create<ClaimStoreState & ClaimStoreActions>(
//   set => ({
//     isLoading: false,
//     isNameLoading: false,
//     isImageUploading: false,
//     incidentTypeList: [],
//     bankList: [],
//     accountDetails: null,

//     setIsLoading: (loading: boolean) => set({isLoading: loading}),
//     setIsNameLoading: (loading: boolean) => set({isNameLoading: loading}),
//     setIsImageUploading: (uploading: boolean) =>
//       set({isImageUploading: uploading}),
//     setIncidentTypeList: (incidentTypeList: string[]) =>
//       set({incidentTypeList}),
//     setBankList: (bankList: BankModel[]) => set({bankList}),
//     setAccountDetails: (accountDetails: BankAccountModel | null) =>
//       set({accountDetails}),
//   }),
// );

const claimRepository = new ClaimRepository();
const fileRepository = new FileRepository();
const productRepository = new ProductRepository();

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const navigation = useNavigation<NavigationProps>();
// const global = useGlobalStore((state: GlobalStore) => state);

// export const  = {
export const ClaimViewModel = () => {
  // getClaimsById: async (
  //   email: string,
  //   policyNumber: string,
  //   // productDetails: ProductDetailsModel,
  //   loadingState: LoadStore,
  // ) => {

  const getClaimsById = async (
    email: string,
    policyNumber: string
  ): Promise<void> => {
    try {
      // loadingState.setClaimVmLoading(true);

      const res = await claimRepository.getClaimsById(
        globalObject.policyId ?? ''
      );

      const policyRes = await claimRepository.getPolicyInfo(
        email,
        policyNumber
      );

      const policy = PolicyModel.fromJson(policyRes.data);

      const productRes = await productRepository.getProductDetailsById(
        policy.productId ?? ''
      );

      const productDetails = ProductDetailsModel.fromJson(
        productRes.data['products'][0]
      );

      if (policy.product?.claimable != true) {
        showToast(
          ToastStatus.failed,
          'Selected product is not claimable, please try again'
        );
      } else if (
        res.message == 'Claim does not exist' &&
        res.responseCode == 0
      ) {
        // loadingState.setClaimVmLoading(false);
        navigation.navigate('ConfirmPolicyInfoScreen', {
          policy,
          productDetails,
        });
      } else {
        const claim = ClaimModel.fromJson(res.data);
        // loadingState.setClaimVmLoading(false);

        if (productDetails?.productCategory?.name?.toLowerCase() === 'travel') {
          navigation.navigate('TrackTravelClaimsScreen', { claim });
        } else if (
          productDetails?.productCategory?.name?.toLowerCase() === 'gadget'
        ) {
          navigation.navigate('TrackGadgetClaimsScreen', { claim });
        } else {
          navigation.navigate('TrackClaimsScreen', { claim });
        }
      }
    } catch (error) {
      // loadingState.setClaimVmLoading(false);
      console.error(error);
      showToast(
        ToastStatus.failed,
        'Selected product is not claimable, please try again'
      );
    }
  };

  const getAllIncidentTypes = async (
    productDetails: ProductDetailsModel,
    claimStore: ClaimStore
  ): Promise<void> => {
    try {
      let res;
      if (productDetails?.productCategory?.name?.toLowerCase() === 'gadget') {
        res = await claimRepository.getIncidentType(ClaimType.gadget);
      } else if (
        productDetails?.productCategory?.name?.toLowerCase() === 'travel'
      ) {
        res = await claimRepository.getIncidentType(ClaimType.travel);
      } else {
        res = await claimRepository.getIncidentType(ClaimType.auto);
      }

      if (res.responseCode === 1) {
        claimStore.setIncidentTypeList(res.data);
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);

      showToast(ToastStatus.failed, 'Please try again');
    }
  };
  // ////HEREEE

  const navigateToTrackClaims = async (policyId: string): Promise<void> => {
    // const {setIsLoading} = useClaimStore.getState();
    try {
      // setIsLoading(true);

      const res = await claimRepository.getClaimsById(policyId);

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data);
        // setIsLoading(false);
        if (claim.travelClaimMeta) {
          navigation.navigate('TrackTravelClaimsScreen', { claim });
        } else if (claim.gadgetClaimMeta) {
          navigation.navigate('TrackGadgetClaimsScreen', { claim });
        } else {
          navigation.navigate('TrackClaimsScreen', { claim });
        }
      } else {
        // setIsLoading(false);

        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      // setIsLoading(false);
      console.error(error);

      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitVehicleClaim = async (
    claimData: VehicleClaimData,
    loadingState: LoadStore
  ): Promise<void> => {
    try {
      loadingState.setClaimVmLoading(true);

      const res = await claimRepository.submitVehicleClaim(claimData);

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);

        loadingState.setClaimVmLoading(false);
        navigation.navigate('ClaimSubmittedScreen', { claim });
      } else {
        loadingState.setClaimVmLoading(false);
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      loadingState.setClaimVmLoading(false);
      console.error(error);

      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitThirdPartyClaim = async (
    claimData: ThirdPartyClaimData
    // loadingState: LoadStore,
  ): Promise<void> => {
    try {
      // loadingState.setClaimVmLoading(true);

      const res = await claimRepository.submitThirdPartyClaim(claimData);

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);

        // loadingState.setClaimVmLoading(false);

        const submissionStep = ClaimSubmissionStep.thirdPartyClaimLodged;
        navigation.navigate('ClaimSubmittedScreen', { claim, submissionStep });
      } else {
        // loadingState.setClaimVmLoading(false);

        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      // loadingState.setClaimVmLoading(false);
      console.error(error);

      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitGadgetClaim = async (
    gadgetClaimData: InitialGadgetClaimData
  ): Promise<void> => {
    try {
      const fileData: FileData = {
        uri: gadgetClaimData.paymentReceipt.uri,
        name: gadgetClaimData.paymentReceipt.name,
      };
      const uploadRes = await fileRepository.uploadFile(fileData);

      if (uploadRes.responseCode === 1) {
        const paymentReceiptUrl = uploadRes.data.file_url;
        const res = await claimRepository.submitGadgetClaim({
          ...gadgetClaimData,
          paymentReceiptUrl,
        });

        if (res.responseCode === 1) {
          const claim = ClaimModel.fromJson(res.data.claim);

          navigation.navigate('GadgetClaimSubmittedScreen', { claim });
        } else {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          showToast(ToastStatus.failed, errorMessage);
        }
      } else {
        const errorMessage =
          uploadRes.errors && uploadRes.errors.length > 0
            ? uploadRes.errors.join(', ')
            : uploadRes.message;

        showToast(ToastStatus.failed, errorMessage);
        throw new Error('Failed to upload file');
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitTravelClaim = async (
    travelClaimData: InitialTravelClaimData
  ): Promise<void> => {
    try {
      const results = await Promise.all([
        uploadWithRetry(travelClaimData.boardingPass, 3),
        uploadWithRetry(travelClaimData.bookingInvoice, 3),
      ]);

      const resOne = results[0];
      const resTwo = results[1];

      const res = await claimRepository.submitTravelClaim({
        ...travelClaimData,
        boardingPassUrl: resOne.data.file_url,
        bookingInvoiceUrl: resTwo.data.file_url,
      });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);

        navigation.navigate('TravelClaimSubmittedScreen', { claim });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitVehicleClaimEstimate = async (
    estimateAmount: number,
    selectedInvoice: FileData,
    loadStore: LoadStore
  ): Promise<void> => {
    try {
      loadStore.setClaimVmLoading(true);

      const uploadRes = await fileRepository.uploadFile(selectedInvoice);
      if (uploadRes.responseCode == 1) {
        const claimInvoiceUrl = uploadRes.data.file_url;
        const claimId = globalObject.claimId ?? '';

        const res = await claimRepository.submitVehicleClaimEstimate({
          claimId,
          estimateAmount,
          claimInvoiceUrl,
        });

        if (res.responseCode == 1) {
          const claim = ClaimModel.fromJson(res.data.claim);
          loadStore.setClaimVmLoading(false);
          const claimSubmissionStep = ClaimSubmissionStep.repairEstimate;
          navigation.navigate('ClaimSubmittedScreen', {
            claim: claim,
            submissionStep: claimSubmissionStep,
          });
        } else {
          loadStore.setClaimVmLoading(false);
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          showToast(ToastStatus.failed, errorMessage);
        }

        loadStore.setClaimVmLoading(false);
      } else {
        loadStore.setClaimVmLoading(false);
        const errorMessage =
          uploadRes.errors && uploadRes.errors.length > 0
            ? uploadRes.errors.join(', ')
            : uploadRes.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      loadStore.setClaimVmLoading(false);
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitGadgetClaimEstimate = async (
    estimateAmount: number,
    selectedInvoice: FileData,
    policyNumber: string,
    loadStore: LoadStore
  ): Promise<void> => {
    try {
      loadStore.setClaimVmLoading(true);

      const uploadRes = await fileRepository.uploadFile(selectedInvoice);
      if (uploadRes.responseCode == 1) {
        const claimInvoiceUrl = uploadRes.data.file_url;
        const claimId = globalObject.claimId ?? '';

        const gadgetRes = await claimRepository.submitGadgetClaimEstimate({
          claimId,
          estimateAmount,
          claimInvoiceUrl,
          policyNumber,
        });

        if (gadgetRes.responseCode == 1) {
          const res = await claimRepository.getClaimsById(
            globalObject.policyId ?? ''
          );
          if (res.responseCode == 1) {
            const claim = ClaimModel.fromJson(res.data.claim);
            loadStore.setClaimVmLoading(false);
            const claimSubmissionStep = ClaimSubmissionStep.repairEstimate;
            navigation.navigate('ClaimSubmittedScreen', {
              claim: claim,
              submissionStep: claimSubmissionStep,
            });
          } else {
            loadStore.setClaimVmLoading(false);
            const errorMessage =
              res.errors && res.errors.length > 0
                ? res.errors.join(', ')
                : res.message;

            showToast(ToastStatus.failed, errorMessage);
          }
        } else {
          loadStore.setClaimVmLoading(false);
          const errorMessage =
            gadgetRes.errors && gadgetRes.errors.length > 0
              ? gadgetRes.errors.join(', ')
              : gadgetRes.message;

          showToast(ToastStatus.failed, errorMessage);
        }

        loadStore.setClaimVmLoading(false);
      } else {
        loadStore.setClaimVmLoading(false);
        const errorMessage =
          uploadRes.errors && uploadRes.errors.length > 0
            ? uploadRes.errors.join(', ')
            : uploadRes.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      loadStore.setClaimVmLoading(false);
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const rejectClaimOffer = async (
    claim: ClaimModel,
    comment: string
  ): Promise<void> => {
    try {
      const res = await claimRepository.rejectClaimOffer({
        comment: comment,
        claimId: globalObject.claimId ?? '',
        customerId: claim?.customerId ?? '',
        providerId: claim?.providerId ?? '',
      });

      if (res.responseCode == 1) {
        // const newClaim = ClaimModel.fromJson(res.data.claim);
        const claimSubmissionStep = ClaimSubmissionStep.offerRejected;
        navigation.navigate('ClaimSubmittedScreen', {
          claim: claim,
          detailedClaim: claim,
          submissionStep: claimSubmissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const getBankList = async (
    claim: ClaimModel,
    shouldNavigate: boolean = false, // default value set to false
    claimStore: ClaimStore
  ): Promise<void> => {
    try {
      const res = await claimRepository.getBankList();
      if (res.responseCode == 1) {
        const banks: BankModel[] =
          (res.data?.banks as any[] | undefined)
            ?.filter((e) => e !== null)
            .map((e) => BankModel.fromJson(e)) ?? [];

        claimStore.setBankList(banks);

        if (shouldNavigate) {
          navigation.navigate('AcceptOfferScreen', {
            claim: claim,
            banks: banks,
          });
        }
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const acceptClaimOffer = async (
    claim: ClaimModel,
    accountNumber: string,
    bankCode: string,
    accountName: string,
    bankName: string
  ): Promise<void> => {
    try {
      const res = await claimRepository.acceptClaimOffer({
        accountName: accountName,
        accountNumber: accountNumber,
        bankCode: bankCode,
        bankName: bankName,
        claimId: claim.id ?? '',
        customerId: claim.customerId ?? '',
        providerId: claim.providerId ?? '',
      });
      if (res.responseCode == 1) {
        const claim = ClaimModel.fromJson(res.data);

        const claimSubmissionStep = ClaimSubmissionStep.offerAccepted;
        navigation.navigate('ClaimSubmittedScreen', {
          claim: claim,
          submissionStep: claimSubmissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };
  const verifyBankAccount = async (
    accountNumber: string,
    bankCode: string,
    claimStore: ClaimStore
  ): Promise<void> => {
    try {
      const res = await claimRepository.verifyBankAccount({
        accountNumber: accountNumber,
        bankCode: bankCode,
      });
      if (res.responseCode == 1) {
        const bank = BankAccountModel.fromJson(res.data.bank_account);

        claimStore.setAccountDetails(bank);
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitVehiclePoliceReport = async (
    submitVehiclePoliceReport: FileData,
    claimType: ClaimType,
    policyNumber: string
    // claimStore: ClaimStore,
  ): Promise<void> => {
    try {
      const uploadRes = await fileRepository.uploadFile(
        submitVehiclePoliceReport
      );
      if (uploadRes.responseCode == 1) {
        const policeReportUrl = uploadRes.data.file_url;
        const claimId = globalObject.claimId ?? '';

        const res = await claimRepository.submitVehiclePoliceReport({
          claimId: claimId,
          policeReportUrl: policeReportUrl,
          policyNumber: policyNumber,
          claimType: claimType,
        });

        if (res.responseCode == 1) {
          const claim = ClaimModel.fromJson(res.data.claim);
          const claimSubmissionStep =
            claimType == ClaimType.gadget
              ? ClaimSubmissionStep.submitGadgetPoliceReport
              : ClaimSubmissionStep.submitAutoPoliceReport;
          claimType == ClaimType.gadget
            ? navigation.navigate('GadgetClaimSubmittedScreen', {
                claim: claim,
                submissionStep: claimSubmissionStep,
              })
            : navigation.navigate('ClaimSubmittedScreen', {
                claim: claim,
                submissionStep: claimSubmissionStep,
              });
        } else {
          // loadStore.setClaimVmLoading(false);
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          showToast(ToastStatus.failed, errorMessage);
        }

        // loadStore.setClaimVmLoading(false);
      } else {
        // loadStore.setClaimVmLoading(false);
        const errorMessage =
          uploadRes.errors && uploadRes.errors.length > 0
            ? uploadRes.errors.join(', ')
            : uploadRes.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitTravelClaimMedicalDocumentation = async (
    amount: number,
    medicalReceipt: FileData,
    medicalCertificate: FileData
  ): Promise<void> => {
    try {
      const results = await Promise.all([
        uploadWithRetry(medicalReceipt, 3),
        uploadWithRetry(medicalCertificate, 3),
      ]);

      const resOne = results[0];
      const resTwo = results[1];

      const res = await claimRepository.submitTravelClaimMedicalDocumentation({
        amount: amount,
        claimId: globalObject.claimId ?? '',
        medicalReceipt: resOne.data.file_url,
        medicalCertificate: resTwo.data.file_url,
      });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);
        const submissionStep = ClaimSubmissionStep.travelDocSubmitted;

        navigation.navigate('TravelClaimSubmittedScreen', {
          claim,
          submissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };
  const submitTravelClaimLossDocumentation = async (
    amount: number,
    consulateConfirmationReport: FileData,
    policeReport: FileData
  ): Promise<void> => {
    try {
      const results = await Promise.all([
        uploadWithRetry(consulateConfirmationReport, 3),
        uploadWithRetry(policeReport, 3),
      ]);

      const resOne = results[0];
      const resTwo = results[1];

      const res = await claimRepository.submitTravelClaimLossDocumentation({
        amount: amount,
        claimId: globalObject.claimId ?? '',
        consulateConfirmationReport: resOne.data.file_url,
        policeReport: resTwo.data.file_url,
      });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);
        const submissionStep = ClaimSubmissionStep.travelDocSubmitted;

        navigation.navigate('TravelClaimSubmittedScreen', {
          claim,
          submissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitTravelClaimBaggageLossDocumentation = async (
    amount: number,
    purchaseReceipt: FileData,
    policeReport: FileData,
    repairEstimate: FileData,
    otherReport: FileData
  ): Promise<void> => {
    try {
      const results = await Promise.all([
        uploadWithRetry(purchaseReceipt, 3),
        uploadWithRetry(policeReport, 3),
        uploadWithRetry(repairEstimate, 3),
        uploadWithRetry(otherReport, 3),
      ]);

      const resOne = results[0];
      const resTwo = results[1];
      const resThree = results[2];
      const resFour = results[3];

      const res =
        await claimRepository.submitTravelClaimBaggageLossDocumentation({
          amount: amount,
          claimId: globalObject.claimId ?? '',
          purchaseReceipt: resOne.data.file_url,
          policeReport: resTwo.data.file_url,
          repairEstimate: resThree.data.file_url,
          otherReport: resFour.data.file_url,
        });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);
        const submissionStep = ClaimSubmissionStep.travelDocSubmitted;

        navigation.navigate('TravelClaimSubmittedScreen', {
          claim,
          submissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitTravelClaimBaggageDelayDocumentation = async (
    amount: number,
    propertyIrregularityReport: FileData
  ): Promise<void> => {
    try {
      const results = await Promise.all([
        uploadWithRetry(propertyIrregularityReport, 3),
      ]);

      const resOne = results[0];

      const res =
        await claimRepository.submitTravelClaimBaggageDelayDocumentation({
          amount: amount,
          claimId: globalObject.claimId ?? '',
          propertyIrregularityReport: resOne.data.file_url,
        });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);
        const submissionStep = ClaimSubmissionStep.travelDocSubmitted;

        navigation.navigate('TravelClaimSubmittedScreen', {
          claim,
          submissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitTravelClaimPersonalMoneyDocumentation = async (
    amount: number,
    policeReport: FileData,
    debitReceipt: FileData,
    otherReport: FileData
  ): Promise<void> => {
    try {
      const results = await Promise.all([
        uploadWithRetry(policeReport, 3),
        uploadWithRetry(debitReceipt, 3),
        uploadWithRetry(otherReport, 3),
      ]);

      const resOne = results[0];
      const resTwo = results[1];
      const resThree = results[2];

      const res =
        await claimRepository.submitTravelClaimPersonalMoneyDocumentation({
          amount: amount,
          claimId: globalObject.claimId ?? '',
          policeReport: resOne.data.file_url,
          debitReceipt: resTwo.data.file_url,
          otherReport: resThree.data.file_url,
        });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);
        const submissionStep = ClaimSubmissionStep.travelDocSubmitted;

        navigation.navigate('TravelClaimSubmittedScreen', {
          claim,
          submissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitTravelClaimMissedDepartureDocumentation = async (
    missedDepartureReason: string,
    otherReport: FileData,
    transporterReport: FileData,
    globalStore: GlobalStore
  ): Promise<void> => {
    try {
      const results = await Promise.all([
        uploadWithRetry(otherReport, 3),
        uploadWithRetry(transporterReport, 3),
      ]);

      const resOne = results[0];
      const resTwo = results[1];

      const res =
        await claimRepository.submitTravelClaimMissedDepartureDocumentation({
          claimId: globalObject.claimId ?? '',
          missedDepartureReason: missedDepartureReason,
          otherReport: resOne.data.file_url,
          transporterReport: resTwo.data.file_url,
          globalStore: globalStore,
        });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);
        const submissionStep = ClaimSubmissionStep.travelDocSubmitted;

        navigation.navigate('TravelClaimSubmittedScreen', {
          claim,
          submissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitTravelClaimFLightDelayDocumentation = async (
    travelDelayReason: string,
    departureTime: string,
    delayConfirmation: FileData,
    globalStore: GlobalStore
  ): Promise<void> => {
    try {
      const results = await Promise.all([
        uploadWithRetry(delayConfirmation, 3),
      ]);

      const resOne = results[0];

      const res =
        await claimRepository.submitTravelClaimFLightDelayDocumentation({
          claimId: globalObject.claimId ?? '',
          departureTime: departureTime,
          travelDelayReason: travelDelayReason,
          delayConfirmation: resOne.data.file_url,
          globalStore: globalStore,
        });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);
        const submissionStep = ClaimSubmissionStep.travelDocSubmitted;

        navigation.navigate('TravelClaimSubmittedScreen', {
          claim,
          submissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  const submitTravelClaimLegalExpenseDocumentation = async (
    witnessDetails: string,
    eventDescription: string,
    writtenSummon: FileData,
    globalStore: GlobalStore
  ): Promise<void> => {
    try {
      const results = await Promise.all([uploadWithRetry(writtenSummon, 3)]);

      const resOne = results[0];

      const res =
        await claimRepository.submitTravelClaimLegalExpenseDocumentation({
          claimId: globalObject.claimId ?? '',
          witnessDetails: witnessDetails,
          eventDescription: eventDescription,
          writtenSummon: resOne.data.file_url,
          globalStore: globalStore,
        });

      if (res.responseCode === 1) {
        const claim = ClaimModel.fromJson(res.data.claim);
        const submissionStep = ClaimSubmissionStep.travelDocSubmitted;

        navigation.navigate('TravelClaimSubmittedScreen', {
          claim,
          submissionStep,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast(ToastStatus.failed, 'Please try again later');
    }
  };

  async function uploadWithRetry(
    fileData: FileData,
    maxRetries: number
  ): Promise<GenericResponse> {
    let attempts = 0;

    while (attempts < maxRetries) {
      try {
        const res = await fileRepository.uploadFile(fileData);
        if (res.responseCode === 1) {
          return res;
        }
      } catch (error) {
        console.error('Upload attempt failed', error);
      }

      attempts++;
    }

    throw new Error(`Failed to upload file after ${maxRetries} attempts`);
  }

  return {
    getClaimsById,
    submitTravelClaim,
    submitVehicleClaim,
    submitGadgetClaim,
    navigateToTrackClaims,
    getAllIncidentTypes,
    submitVehicleClaimEstimate,
    rejectClaimOffer,
    getBankList,
    acceptClaimOffer,
    verifyBankAccount,
    submitVehiclePoliceReport,
    submitThirdPartyClaim,
    submitTravelClaimMedicalDocumentation,
    submitTravelClaimLossDocumentation,
    submitTravelClaimBaggageLossDocumentation,
    submitTravelClaimBaggageDelayDocumentation,
    submitTravelClaimPersonalMoneyDocumentation,
    submitTravelClaimMissedDepartureDocumentation,
    submitTravelClaimFLightDelayDocumentation,
    submitTravelClaimLegalExpenseDocumentation,
    submitGadgetClaimEstimate,
  };
};
