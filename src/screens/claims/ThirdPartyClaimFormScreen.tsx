import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, I18nManager } from 'react-native';
import { useForm } from 'react-hook-form';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomAppBar from '../../components/CustomAppBar';
import CustomButton from '../../components/CustomButton';
import PoweredByFooter from '../../components/PoweredByFooter';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import { PolicyModel } from '../../models/PolicyModel';
import globalObject from '../../store/globalObject';
import CustomMiniTimePicker from './components/CustomMiniTimePicker';
import CustomMiniDatePicker from './components/CustomMiniDatePicker';
import CustomListDropdownMultiSelectField from './components/CustomListDropdownMultiSelectField';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RegularText,
  SemiBoldText,
  W500Text,
} from '../../components/CustomText';
import { VerticalSpacer } from '../../components/Spacer';
import ValidatedCustomFormTextField from '../../components/ValidatedCustomFormTextField';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AnimatedToggleSwitch from './components/AnimatedToggleSwitch';
import { ClaimViewModel } from './ClaimViewModel';

export interface ThirdPartyClaimFormScreenProps {
  policy: PolicyModel;
}

type ThirdPartyClaimFormScreenRouteProps = RouteProp<
  RootStackParamList,
  'ThirdPartyClaimFormScreen'
>;

const ThirdPartyClaimFormScreen: React.FC<
  ThirdPartyClaimFormScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  const route = useRoute<ThirdPartyClaimFormScreenRouteProps>();
  const { policy } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  // Equivalent to State in Flutter
  // const [showFirstForm, setShowFirstForm] = useState(true);
  const [formStep, setFormStep] = useState(1);
  // const [selectedIncidentType, setSelectedIncidentType] = useState<
  //   string | null
  // >(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedTimeString, setSelectedTimeString] = useState<string | null>();
  const [selectedDamageType, setSelectedDamageType] = useState<string[]>([]);
  const [incidentLocation, setIncidentLocation] = useState<string | null>(null);
  const [whatHappened, setWhatHappened] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [thirdPartyFullName, setThirdPartyFullName] = useState<string | null>(
    null
  );

  const [thirdPartyPolicyNumber, setThirdPartyPolicyNumber] = useState<
    string | null
  >(null);
  const [thirdPartyInsuranceProvider, _setThirdPartyInsuranceProvider] =
    useState<string | null>(null);

  const [thirdPartyPhoneNumber, setThirdPartyPhoneNumber] = useState<
    string | null
  >(null);
  const [thirdPartyEmailAddress, setThirdPartyEmailAddress] = useState<
    string | null
  >(null);
  const [thirdPartyInsured, _setThirdPartyInsured] = useState<boolean>(false);
  const [value, setValue] = useState<number>(1); // initial value set to 1
  const claimVm = ClaimViewModel();
  const items = [
    'Third party bodily injury',
    'Third party property damage',
    'Third party death',
  ];

  const handleContinue = () => {
    // console.log(selectedIncidentType);

    if (!selectedDamageType || !selectedDate || !selectedTime) {
      return;
    }

    const tempSelectedTimeString = selectedTime?.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setSelectedTimeString(tempSelectedTimeString);

    // Switch forms or navigate to the next screen based on the data
    setFormStep(2);
  };

  const handleSecondFormContinue = () => {
    // console.log(selectedIncidentType);

    // if (!selectedIncidentType || !selectedDate || !selectedTime) {
    //   return;
    // }

    // Switch forms or navigate to the next screen based on the data
    setFormStep(3);
  };

  const onSubmit = async () => {
    setIsLoading(true);

    // isThirdPartyInsured: boolean;
    // thirdPartyLossType: string[];
    if (value == 0) {
      setIsLoading(true);

      await claimVm.submitThirdPartyClaim(
        {
          policyId: globalObject.policyId ?? '',
          // claimType: 'Vehicle',
          description: whatHappened ?? '',
          // incidentDate: selectedDate?.toString() ?? '',
          // incidentTime: selectedTime?.toString() ?? '',

          incidentDate: selectedDate?.toString() ?? '',
          incidentTime: selectedTimeString?.toString() ?? '',
          incidentLocation: incidentLocation ?? '',
          // thirdPartyLossType: selectedIncidentType ?? '',

          thirdPartyLossType: selectedDamageType,
          thirdPartyPhoneNumber: thirdPartyPhoneNumber ?? '',
          thirdPartyFullName: thirdPartyFullName ?? '',
          thirdPartyPolicyNumber: thirdPartyPolicyNumber ?? '',
          thirdPartyEmail: thirdPartyEmailAddress ?? '',
          isThirdPartyInsured: thirdPartyInsured,
          thirdPartyInsuranceProvider: thirdPartyInsuranceProvider ?? '',
        }

        // loadingState
      );
      setIsLoading(true);
    } else {
      setFormStep(4);
    }

    // navigation.navigate('ClaimSummaryScreen', {
    //   incidentType: selectedIncidentType ?? '',
    //   incidentDate: selectedDate?.toString() ?? '',
    //   incidentTime: selectedTime?.toString() ?? '',
    //   lossType: selectedDamageType,
    //   incidentLocation: incidentLocation ?? '',
    //   isThirdParty: false,
    //   description: whatHappened ?? '',
    //   thirdPartyLossType: [],
    //   thirdPartyPhoneNumber: '',
    //   claimType: 'Vehicle',
    // });
    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <CustomAppBar
        showBackButton={true}
        showLogo={false}
        onBackTap={() => {
          if (formStep > 1) {
            setFormStep(formStep - 1);
          } else {
            navigation.goBack();
          }
        }}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        extraScrollHeight={100} // Additional scroll height to prevent overlapping with keyboard
        enableOnAndroid={true} // To make sure it works on Android too
      > */}
        <SemiBoldText
          title="Submit your claim"
          fontSize={21}
          textAlign="center"
        />
        <VerticalSpacer height={20} />
        <View style={styles.vehicleInfo}>
          <RegularText
            title="Vehicle name"
            fontSize={14}
            color={CustomColors.greyTextColor}
          />
          <VerticalSpacer height={2} />
          <SemiBoldText
            title={`${policy.meta['vehicle_make'] ?? ''} ${
              policy.meta['vehicle_model'] ?? ''
            } ${policy.meta['year_of_manufacture'] ?? ''}`}
            fontSize={15}
            color={DynamicColors().primaryBrandColor}
          />
          <VerticalSpacer height={15} />
          <RegularText
            title="Plate number"
            fontSize={14}
            color={CustomColors.greyTextColor}
          />
          <VerticalSpacer height={2} />
          <SemiBoldText
            title={policy.meta['registration_number'] ?? ''}
            fontSize={15}
            color={DynamicColors().primaryBrandColor}
          />
          <Image
            source={require('../../assets/images/car_image.webp')}
            style={styles.carImage}
          />
        </View>
        <VerticalSpacer height={20} />
        {formStep == 1 ? (
          <>
            {/* <View style={styles.vehicleInfo}>
              <RegularText
                title="Vehicle name"
                fontSize={14}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={2} />
              <SemiBoldText
                title={`${policy.meta['vehicle_make'] ?? ''} ${
                  policy.meta['vehicle_model'] ?? ''
                } ${policy.meta['year_of_manufacture'] ?? ''}`}
                fontSize={15}
                color={DynamicColors().primaryBrandColor}
              />
              <VerticalSpacer height={15} />
              <RegularText
                title="Plate number"
                fontSize={14}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={2} />
              <SemiBoldText
                title={policy.meta['registration_number'] ?? ''}
                fontSize={15}
                color={DynamicColors().primaryBrandColor}
              />
              <Image
                source={require('../../assets/images/car_image.webp')}
                style={styles.carImage}
              />
            </View>
            <VerticalSpacer height={20} /> */}

            {/* <CustomListDropdownField
              label="Select Incident type"
              showSearch={false}
              items={claimStore.incidentTypeList} //    {['Accidental damage', 'Theft']}
              selectedItem={selectedIncidentType}
              onValueChange={(value: string) => setSelectedIncidentType(value)}
            /> */}

            <CustomListDropdownMultiSelectField
              label="Select Incident type"
              description="Select Incident type"
              items={items} //{claimStore.incidentTypeList}
              selectedItems={selectedDamageType}
              onValueChange={(items: string[]) => setSelectedDamageType(items)}
            />

            <CustomMiniDatePicker
              label="Enter date of incident"
              description="dd/mm/yyyy"
              isTodayMax={false}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
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
        ) : formStep == 2 ? (
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
              title="Continue"
              isLoading={isLoading}
              onPress={handleSubmit(handleSecondFormContinue)}
            />
          </>
        ) : formStep == 3 ? (
          <>
            {/* <CustomListDropdownMultiSelectField
              label="Select damageType"
              description="Select damageType"
              items={['Collision', 'Fire', 'Vandalization', 'Windscreen']}
              selectedItems={selectedDamageType}
              onValueChange={(items: string[]) => setSelectedDamageType(items)}
            /> */}

            <ValidatedCustomFormTextField
              name={'Enter third-Party full name'}
              title={'Enter third-Party full name'}
              hintText={'Enter third-Party full name'}
              value={thirdPartyFullName ?? ''}
              control={control}
              onChanged={(text: string) => setThirdPartyFullName(text)}
              minMaxConstraint={'length'}
              minLength={4}
            />
            <VerticalSpacer height={10} />

            <ValidatedCustomFormTextField
              name={'Third-party phone number'}
              title={'Third-party phone number'}
              hintText={'Enter Third-party phone number'}
              value={thirdPartyPhoneNumber ?? ''}
              inputType={'phone'}
              control={control}
              onChanged={(text: string) => setThirdPartyPhoneNumber(text)}
              minMaxConstraint={'length'}
              minLength={4}
            />
            <VerticalSpacer height={10} />
            <ValidatedCustomFormTextField
              name={'Third-party email address'}
              title={'Third-party email address'}
              hintText={'Enter Third-party email address'}
              value={thirdPartyEmailAddress ?? ''}
              control={control}
              onChanged={(text: string) => setThirdPartyEmailAddress(text)}
              minMaxConstraint={'length'}
              minLength={4}
            />
            {/* <VerticalSpacer height={10} />
            <ValidatedCustomFormTextField
              name={'Enter incident location'}
              title={'Enter incident location'}
              hintText={'Enter incident location'}
              value={incidentLocation ?? ''}
              control={control}
              onChanged={(text: string) => setIncidentLocation(text)}
              minMaxConstraint={'length'}
              minLength={4}
            /> */}
            <VerticalSpacer height={10} />
            <View style={styles.row}>
              <W500Text
                title="Is the third-party vehicle insured?"
                fontSize={14}
                color={CustomColors.formTitleColor}
              />
              <AnimatedToggleSwitch value={value} onChange={setValue} />
            </View>
            <VerticalSpacer height={20} />

            {/* <View style={styles.row}>
              <W500Text
                title="Is the third-party vehicle insured?"
                fontSize={14}
                color={CustomColors.formTitleColor}
              />
              <View style={styles.switchContainer}>
                <Switch
                  value={value === 1} // Switch value is true if value is 1
                  onValueChange={val => setValue(val ? 1 : 0)} // Toggle between 1 and 0
                  disabled={false}
                  // activeText={'Yes'}
                  inActiveText={'No'}
                  circleSize={30}
                  barHeight={28}
                  circleBorderWidth={0.5}
                  backgroundActive={DynamicColors().primaryBrandColor}
                  backgroundInactive={CustomColors.greyToastColor}
                  circleActiveColor={CustomColors.whiteColor}
                  circleInActiveColor={CustomColors.whiteColor}
                  renderActiveText={true}
                  renderInActiveText={true}
                  switchLeftPx={I18nManager.isRTL ? -2 : 2}
                  switchRightPx={I18nManager.isRTL ? 2 : -2}
                  switchWidthMultiplier={2.5}
                  switchBorderRadius={5}
                />
              </View>
            </View> */}

            <View style={{ flex: 1 }} />

            <CustomButton
              title="Continue"
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
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
              name={'Enter third-Party policy number'}
              title={'Enter third-Party policy number'}
              hintText={'Enter third-Party policy number'}
              value={thirdPartyPolicyNumber ?? ''}
              control={control}
              onChanged={(text: string) => setThirdPartyPolicyNumber(text)}
              minMaxConstraint={'length'}
              minLength={4}
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
              title="Continue"
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </>
        )}

        <PoweredByFooter />
      </ScrollView>
    </ScrollView>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  switchContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
});

export default ThirdPartyClaimFormScreen;
