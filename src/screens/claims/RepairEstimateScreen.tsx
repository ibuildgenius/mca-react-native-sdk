import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import DottedBorder from 'react-native-dotted-border'; // You can use a similar package for React Native or implement a custom border
import CustomButton from '../../components/CustomButton';
import { ClaimModel } from '../../models/ClaimModel';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomAppBar from '../../components/CustomAppBar';
import { SemiBoldText, RegularText } from '../../components/CustomText';
import PoweredByFooter from '../../components/PoweredByFooter';
import { HorizontalSpacer, VerticalSpacer } from '../../components/Spacer';
import { CustomColors } from '../../constants/CustomColors';
import * as ImagePicker from 'react-native-image-picker'; // Image picker for CLI project
import { ClaimViewModel } from './ClaimViewModel';
import UploadInvoiceIcon from '../../assets/icons/upload_invoice.svg';
import DeleteInvoiceIcon from '../../assets/icons/delete_invoice.svg';
import ValidatedCustomFormTextField from '../../components/ValidatedCustomFormTextField';
import { useForm } from 'react-hook-form';
import GenericSimplePopup from '../../popups/GenericSimplePopup';
import GenericBottomSheet from '../../bottom_sheets/GenericBottomSheet';
import RepairEstimateWidget from './components/RepairEstimateWidget';
import { type LoadStore, useLoadStore } from '../../store/loadStore';
import globalObject from '../../store/globalObject';
// import globalObject from 'store/globalObject';

interface RepairEstimateScreenProps {
  claim: ClaimModel; // Adjust the type of claim according to your model
}

type RepairEstimateScreenRouteProps = RouteProp<
  RootStackParamList,
  'RepairEstimateScreen'
>;

const RepairEstimateScreen: React.FC<RepairEstimateScreenProps> = () => {
  const route = useRoute<RepairEstimateScreenRouteProps>();
  const { control, handleSubmit } = useForm();
  const { claim } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();
  const loadStore = useLoadStore((state: LoadStore) => state);

  const [amount, setAmount] = useState<string | null>(null);
  // const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const claimVm = ClaimViewModel();

  const [selectedFile, setSelectedFile] = useState<any>(null);
  // const [isDoc, setIsDoc] = useState(false); // Track if the selected file is a document

  const [isSimplePopupVisible, setSimplePopupVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleSubmitEstimate = async () => {
    if (claim.gadgetClaimMeta) {
      claimVm.submitGadgetClaimEstimate(
        parseInt(amount?.replace(',', '') ?? '', 10), // estimateAmount
        selectedFile, // selectedInvoice, make sure this is a FileData object

        claim.gadgetClaimMeta.policy_number ?? globalObject.policyNumber,
        loadStore // loadStore
      );
    } else {
      claimVm.submitVehicleClaimEstimate(
        parseInt(amount?.replace(',', '') ?? '', 10), // estimateAmount
        selectedFile, // selectedInvoice, make sure this is a FileData object
        loadStore // loadStore
      );
    }
  };

  const verifyUserInput = async () => {
    // if (!amount || !selectedInvoice) return;
    setSimplePopupVisible(true);
    // GenericDialog().showGenericSimplePopup({
    //   context: this,
    //   title: 'Estimate of repair',
    //   content:
    //     'You are about to send an estimate of repair, are you sure you want to proceed with this action?',
    //   okText: 'Yes, proceed',
    //   onOkPressed: async () => {
    //     if (claim.gadgetClaimMeta) {
    //       await claimVm.submitGadgetClaimEstimate({
    //         estimateAmount: amount,
    //         selectedInvoice,
    //         policyNumber: claim.gadgetClaimMeta['policy_number'] || '',
    //       });
    //     } else {
    //       await claimVm.submitVehicleClaimEstimate({
    //         estimateAmount: amount,
    //         selectedInvoice,
    //       });
    //     }
    //   },
    // });
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
          title="Provide estimate of repair"
          fontSize={21}
          textAlign="center"
        />
        <VerticalSpacer height={30} />
        <View style={styles.card}>
          <SemiBoldText title="Estimate of repair invoice" fontSize={18} />
          <VerticalSpacer height={10} />
          <View style={{ paddingRight: 65 }}>
            <RegularText
              title="This is an invoice from a registered mechanic. Click the help button
          above to learn more."
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
        <VerticalSpacer height={20} />
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
                  Click to upload Repair Invoice
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <VerticalSpacer height={40} />
        {/* <CustomTextFormField
          label="Enter estimate amount"
          placeholder="Enter estimate amount"
          keyboardType="numeric"
          onChangeText={value => setAmount(Number(value.replace(/,/g, '')))}
        /> */}

        <ValidatedCustomFormTextField
          name={'Enter estimate amount'}
          title={'Enter estimate amount'}
          hintText={'Enter estimate amount'}
          isNumber={true}
          isCurrency={true}
          value={amount ?? ''}
          control={control}
          onChanged={(text: string) => {
            // return setAmount(Number(text.replace(/,/g, '')));
            setAmount(text);
          }}
          // onChangeText={value => setAmount(Number(value.replace(/,/g, '')))}
          minMaxConstraint={'value'}
          minLength={100}
        />

        <View style={{ flex: 1 }}></View>

        <View style={styles.newButtonContainer}>
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Do this later"
              buttonColor={CustomColors.dividerGreyColor}
              textColor={CustomColors.backTextColor}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>
          <HorizontalSpacer width={10} />

          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Continue"
              isLoading={loadStore.claimVmLoading}
              onPress={
                !amount || !selectedFile
                  ? undefined
                  : handleSubmit(verifyUserInput)
              }
            />
          </View>
        </View>

        <VerticalSpacer height={5} />
        <PoweredByFooter />
        <VerticalSpacer height={30} />
        <GenericSimplePopup
          isVisible={isSimplePopupVisible}
          title="Estimate of repair"
          content="You are about to send an estimate of repair, are you sure you want to proceed with this action?"
          okText="Yes, proceed"
          policyNumber="12345"
          onClose={() => setSimplePopupVisible(false)}
          onOkPressed={handleSubmitEstimate}
        />
        <GenericBottomSheet
          title="Do this later"
          isVisible={isModalVisible}
          content={<RepairEstimateWidget />}
          onClose={() => setModalVisible(false)}
          onOkPressed={() => {
            navigation.popToTop();
          }}
        />
      </View>
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
    // marginHorizontal: 5,
  },
});

export default RepairEstimateScreen;
