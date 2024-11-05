import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; // Image picker for CLI project
// import GenericDialog from '../components/GenericDialog'; // Your custom GenericDialog component
import CustomButton from '../../components/CustomButton';
import PoweredByFooter from '../../components/PoweredByFooter';
import CustomAppBar from '../../components/CustomAppBar';
import { VerticalSpacer } from '../../components/Spacer';
import { ClaimType } from '../../utils/enums';
import { ClaimModel } from '../../models/ClaimModel';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import UploadInvoiceIcon from '../../assets/icons/upload_invoice.svg';
import DeleteInvoiceIcon from '../../assets/icons/delete_invoice.svg';
import { RegularText, SemiBoldText } from '../../components/CustomText';
import { CustomColors } from '../../constants/CustomColors';
import GenericSimplePopup from '../../popups/GenericSimplePopup';
import { ClaimViewModel } from './ClaimViewModel';

interface SubmitPoliceReportScreenProps {
  claim: ClaimModel; // Adjust based on your claim model
  claimType?: ClaimType | null; // Assuming ClaimType can be 'auto' or 'gadget'
}

type SubmitPoliceReportScreenRouteProps = RouteProp<
  RootStackParamList,
  'SubmitPoliceReportScreen'
>;

const SubmitPoliceReportScreen: React.FC<
  SubmitPoliceReportScreenProps
> = () => {
  const route = useRoute<SubmitPoliceReportScreenRouteProps>();
  const { claim, claimType = ClaimType.auto } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<any>(null);
  // const [isDoc, setIsDoc] = useState(false); // Track if the selected file is a document

  const [isSimplePopupVisible, setSimplePopupVisible] = useState(false);
  const claimVm = ClaimViewModel();

  const handleSelectFile = async () => {
    // File picker for both images and documents
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'mixed',
    };

    const result = await ImagePicker.launchImageLibrary(options);

    if (result.didCancel) {
      return;
    }

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedFile({
        uri: asset?.uri,
        fileName: asset?.fileName,
        type: asset?.type,
      });
      // setIsDoc(asset?.type !== 'image/jpeg' && asset?.type !== 'image/png');
    }
  };

  const handleSubmitReport = async () => {
    if (!selectedFile) return;
    setSimplePopupVisible(true);

    // GenericDialog().showGenericSimplePopup({
    //   context: this,
    //   title: 'Police Report',
    //   content:
    //     'You are about to submit a police report, are you sure you want to proceed with this action?',
    //   okText: 'Yes, proceed',
    //   onOkPressed: async () => {
    //     await claimVm.submitVehiclePoliceReport({
    //       policeReport: selectedFile,
    //       fileType: isDoc ? 'document' : 'image',
    //       claimType,
    //       policyNumber:
    //         claimType === 'gadget' ? claim.gadgetClaimMeta.policy_number : '',
    //     });
    //   },
    // });
  };

  const handleSubmitVehiclePoliceReport = async () => {
    setIsLoading(true);

    await claimVm.submitVehiclePoliceReport(
      selectedFile,
      claimType,

      claimType == ClaimType.gadget
        ? claim.gadgetClaimMeta['policy_number']
        : '' // loadStore
    );

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* <VerticalSpacer height={20} /> */}
      <CustomAppBar
        showBackButton={true}
        showLogo={false}
        onBackTap={
          navigation.canGoBack() ? () => navigation.goBack() : undefined
        }
      />
      <VerticalSpacer height={30} />
      <View style={styles.paddingContainer}>
        <SemiBoldText
          title="Provide police report"
          fontSize={21}
          textAlign="center"
        />
        <VerticalSpacer height={30} />
        <View style={styles.card}>
          <SemiBoldText title="Police Report" fontSize={18} />
          <VerticalSpacer height={10} />
          <View style={{ paddingRight: 65 }}>
            <RegularText
              title="Provide a police report that captures how the incident happened."
              fontSize={15}
              color={CustomColors.formTitleColor}
              lineHeight={20}
            />
          </View>
          <VerticalSpacer height={20} />

          <Image
            style={styles.invoiceImage}
            source={require('../../assets/images/invoice_img.webp')} // Replace with actual image
          />
        </View>
        <VerticalSpacer height={60} />
        <TouchableOpacity onPress={handleSelectFile}>
          <View style={styles.dottedBorder}>
            <View style={styles.uploadContainer}>
              {/* <Image
              source={
                selectedFile
                  ? require('../../assets/images/invoice_img.webp')
                  : require('../../assets/images/invoice_img.webp')
              }
              style={styles.uploadIcon}
            /> */}
              {selectedFile ? (
                <DeleteInvoiceIcon
                  width={22}
                  height={22}
                  // fill={DynamicColors().primaryBrandColor}
                />
              ) : (
                <UploadInvoiceIcon
                  width={22}
                  height={22}
                  // fill={DynamicColors().primaryBrandColor}
                />
              )}
              <VerticalSpacer height={5} />
              {selectedFile ? (
                <Text style={styles.fileText}>{selectedFile.fileName}</Text>
              ) : (
                <Text style={styles.uploadText}>
                  Click to upload police report
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <VerticalSpacer height={40} />
        <View style={{ flex: 1 }}></View>

        <View style={styles.newButtonContainer}>
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Do this later"
              buttonColor={CustomColors.dividerGreyColor}
              textColor={CustomColors.backTextColor}
              onPress={() => {
                // Go back functionality here
              }}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <CustomButton title="Continue" onPress={handleSubmitReport} />
          </View>
        </View>

        <VerticalSpacer height={5} />
        <PoweredByFooter />
        <VerticalSpacer height={30} />
        {/* <SimplePopup
          isVisible={isSimplePopupVisible}
          policyNumber="12345"
          onClose={() => setSimplePopupVisible(false)}
        /> */}
      </View>
      <GenericSimplePopup
        isVisible={isSimplePopupVisible}
        title="Police Report"
        content={
          'You are about to submit a police report, are you sure you want to proceed with this action?'
        }
        okText="Yes, proceed"
        isLoading={isLoading}
        policyNumber="12345"
        onClose={() => setSimplePopupVisible(false)}
        onOkPressed={() => {
          handleSubmitVehiclePoliceReport();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paddingContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 15,
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bodyText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  invoiceImage: {
    width: 65,
    height: 65,
    marginTop: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  dottedBorder: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  uploadContainer: {
    alignItems: 'center',
    padding: 10,
  },
  uploadIcon: {
    width: 60,
    height: 60,
  },
  uploadText: {
    fontSize: 14.5,
    textAlign: 'center',
    color: '#333',
  },
  fileText: {
    fontSize: 14.5,
    textAlign: 'center',
    color: '#4CAF50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal: 35,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default SubmitPoliceReportScreen;
