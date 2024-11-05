import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomMiniTimePicker from '../../components/CustomMiniTimePicker';
import { VerticalSpacer } from '../../../../components/Spacer';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import CustomButton from '../../../../components/CustomButton';
import type { FileData } from '../../../purchase/form/components/CustomImagePicker';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import { ClaimViewModel } from '../../ClaimViewModel';
import { GlobalStore, useGlobalStore } from '../../../../store/globalStore';
// import { useGlobalStore, type GlobalStore } from 'store/globalStore';

interface TravelDocumentFlightDelayScreenProps {
  formKey: any;
}

const TravelDocumentFlightDelayScreen: React.FC<
  TravelDocumentFlightDelayScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  // State for handling form fields
  const [travelDelayReason, setTravelDelayReason] = useState<string | null>(
    null
  );

  const [departureTime, setDepartureTime] = useState<Date | null>(null);

  const [delayConfirmation, setDelayConfirmation] = useState<FileData | null>(
    null
  );
  const [delayConfirmationError, setDelayConfirmationError] = useState<
    string | null
  >(null);
  const globalStore = useGlobalStore((state: GlobalStore) => state);

  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (departureTime && delayConfirmation) {
      const selectedTimeString = departureTime?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setIsLoading(true);

      await claimVM.submitTravelClaimFLightDelayDocumentation(
        travelDelayReason ?? '',
        selectedTimeString,
        delayConfirmation,
        globalStore
      );
      setIsLoading(false);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'what happened'}
        title={'Reason for departure delay'}
        hintText={'Tell us the reason for departure delay'}
        maxLines={4}
        value={travelDelayReason ?? ''}
        control={control}
        onChanged={(text: string) => setTravelDelayReason(text)}
        minMaxConstraint={'length'}
        minLength={4}
      />

      {/* <CustomMiniTimePicker
        label="Actual time of departure"
        description="--:-- --"
        isTodayMax={true}
        minDate={12}
        selectedTime={departureTime}
        setSelectedTime={setDepartureTime}
        useIsoDateString={true}
      /> */}

      <CustomMiniTimePicker
        label="Actual time of departure"
        description="--:-- --"
        selectedTime={departureTime}
        setSelectedTime={setDepartureTime}
      />

      <VerticalSpacer height={5} />

      <ClaimImagePicker
        fieldName={'Written document from airline or their handling agent'}
        label={'Written document from airline or their handling agent'}
        imageData={delayConfirmation}
        setImageData={setDelayConfirmation}
        error={delayConfirmationError}
        setError={setDelayConfirmationError}
        required={true}
      />

      <VerticalSpacer height={20} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !departureTime || !delayConfirmation || !travelDelayReason
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

export default TravelDocumentFlightDelayScreen;
