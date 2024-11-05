import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomAppBar from '../../../components/CustomAppBar';
import CustomButton from '../../../components/CustomButton';
import { SemiBoldText, RegularText } from '../../../components/CustomText';
import PoweredByFooter from '../../../components/PoweredByFooter';
import { VerticalSpacer } from '../../../components/Spacer';
import ValidatedCustomFormTextField from '../../../components/ValidatedCustomFormTextField';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { PolicyModel } from '../../../models/PolicyModel';
import { useClaimStore, type ClaimStore } from '../../../store/claimStore';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import CustomListDropdownField from '../components/CustomListDropdownField';
import CustomMiniDatePicker from '../components/CustomMiniDatePicker';
import CustomMiniTimePicker from '../components/CustomMiniTimePicker';
import ClaimImagePicker from '../components/ClaimImagePicker';
import type { FileData } from '../../purchase/form/components/CustomImagePicker';

export interface GadgetClaimFirstFormScreenProps {
  policy: PolicyModel;
}

type GadgetClaimFirstFormScreenRouteProps = RouteProp<
  RootStackParamList,
  'GadgetClaimFirstFormScreen'
>;

const GadgetClaimFirstFormScreen: React.FC<
  GadgetClaimFirstFormScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  const route = useRoute<GadgetClaimFirstFormScreenRouteProps>();
  const { policy } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const claimStore = useClaimStore((state: ClaimStore) => state);

  // Equivalent to State in Flutter
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [selectedIncidentType, setSelectedIncidentType] = useState<
    string | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  //   const [selectedTime, setSelectedTime] = useState<{
  //     hour: number;
  //     minute: number;
  //   } | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedTimeString, setSelectedTimeString] = useState<string | null>();
  // const [selectedDamageType, setSelectedDamageType] = useState<string[]>([]);
  const [incidentLocation, setIncidentLocation] = useState<string | null>(null);
  const [whatHappened, setWhatHappened] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState<FileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  //   const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleContinue = () => {
    const tempSelectedTimeString = selectedTime?.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setSelectedTimeString(tempSelectedTimeString);

    // if (!selectedIncidentType || !selectedDate || !selectedTimeString) {
    //   return;
    // }

    // Switch forms or navigate to the next screen based on the data
    setShowFirstForm(false);
  };

  const onSubmit = () => {
    setIsLoading(true);
    navigation.navigate('GadgetClaimSummaryScreen', {
      incidentType: selectedIncidentType ?? '',
      incidentDate: selectedDate?.toString() ?? '',
      incidentTime: selectedTimeString?.toString() ?? '',
      incidentLocation: incidentLocation ?? '',

      description: whatHappened ?? '',
      policyNumber: policy.meta.policy_number ?? '',
      paymentReceipt: imageData!,

      // claimType: 'Gadget',
    });
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        showBackButton={true}
        showLogo={false}
        onBackTap={() => {
          if (!showFirstForm) {
            setShowFirstForm(true);
          } else {
            navigation.goBack();
          }
        }}
      />
      {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        extraScrollHeight={100} // Additional scroll height to prevent overlapping with keyboard
        enableOnAndroid={true} // To make sure it works on Android too
      >
        <SemiBoldText
          title="Submit your claim"
          fontSize={21}
          textAlign="center"
        />
        <VerticalSpacer height={20} />
        <View style={styles.vehicleInfo}>
          <RegularText
            title="Gadget details"
            fontSize={14}
            color={CustomColors.greyTextColor}
          />
          <VerticalSpacer height={2} />
          <SemiBoldText
            title={`${policy.meta.payload.device_make ?? ''} ${
              policy.meta.payload.device_model ?? ''
            }`}
            fontSize={15}
            color={DynamicColors().primaryBrandColor}
          />
          <VerticalSpacer height={15} />
          <RegularText
            title="Serial number"
            fontSize={14}
            color={CustomColors.greyTextColor}
          />
          <VerticalSpacer height={2} />
          <SemiBoldText
            title={policy.meta.payload.device_serial_number ?? ''}
            fontSize={15}
            color={DynamicColors().primaryBrandColor}
          />
          <Image
            source={require('../../../assets/images/gadget_img.webp')}
            style={styles.carImage}
          />
        </View>
        <VerticalSpacer height={20} />
        {showFirstForm ? (
          <>
            <CustomListDropdownField
              label="Select Incident type"
              showSearch={false}
              items={claimStore.incidentTypeList} //    {['Accidental damage', 'Theft']}
              selectedItem={selectedIncidentType}
              onValueChange={(value: string) => setSelectedIncidentType(value)}
            />

            <CustomMiniDatePicker
              label="Enter date of incident"
              description="dd/mm/yyyy"
              isTodayMax={true}
              minDate={12}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              // onDateChange={(date: Date) => setSelectedDate(date)}
            />

            <CustomMiniTimePicker
              label="Incident closest time"
              description="--:-- --"
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            <View style={{ flex: 1 }} />
            <CustomButton title="Continue" onPress={handleContinue} />
          </>
        ) : (
          <>
            {/* <CustomListDropdownMultiSelectField
              label="Select damageType"
              description="Select damageType"
              items={['Collision', 'Fire', 'Vandalization', 'Windscreen']}
              selectedItems={selectedDamageType}
              onValueChange={(items: string[]) => setSelectedDamageType(items)}
            /> */}

            <ValidatedCustomFormTextField
              name={'Enter incident location'}
              title={'Enter incident location'}
              hintText={'Enter incident location'}
              value={incidentLocation ?? ''}
              control={control}
              onChanged={(text: string) => setIncidentLocation(text)}
              minMaxConstraint={'length'}
              minLength={4}
            />
            {/* <VerticalSpacer height={10} /> */}

            <ClaimImagePicker
              fieldName={'Payment receipt'}
              label={'Payment receipt'}
              imageData={imageData}
              setImageData={setImageData}
              error={error}
              setError={setError}
              required={true}
            />

            <VerticalSpacer height={10} />

            <ValidatedCustomFormTextField
              name={'what happened'}
              title={'Tell us how it happened'}
              hintText={'Tell us how it happened'}
              maxLines={4}
              value={whatHappened ?? ''}
              control={control}
              onChanged={(text: string) => setWhatHappened(text)}
              minMaxConstraint={'length'}
              minLength={4}
            />

            <View style={{ flex: 1 }} />

            <CustomButton
              title="Submit"
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </>
        )}

        <PoweredByFooter />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  vehicleInfo: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 10,
    borderRadius: 5,
    paddingVertical: 20,
    width: '100%',
  },
  label: {
    fontSize: 13,
    color: CustomColors.greyTextColor,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: DynamicColors().primaryBrandColor,
  },
  // carImage: {
  //   height: 60,
  //   // width: 50,
  //   resizeMode: 'contain',

  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  // },

  carImage: {
    height: 75,
    width: 75,
    // flex: 1,
    // alignItems: 'flex-end',
    alignSelf: 'flex-end',
    // justifyContent: 'flex-end',
    resizeMode: 'contain',

    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default GadgetClaimFirstFormScreen;
