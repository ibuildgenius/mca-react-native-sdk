import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import { VerticalSpacer } from '../../../../components/Spacer';
import CustomButton from '../../../../components/CustomButton';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import type { FileData } from '../../../purchase/form/components/CustomImagePicker';
import { ClaimViewModel } from '../../ClaimViewModel';
import { GlobalStore, useGlobalStore } from '../../../../store/globalStore';
// import { useGlobalStore, type GlobalStore } from 'store/globalStore';

interface TravelDocumentLegalExpenseScreenProps {
  formKey: any;
}

const TravelDocumentLegalExpenseScreen: React.FC<
  TravelDocumentLegalExpenseScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  // State for handling form fields
  const [eventDescription, setEventDescription] = useState<string | null>(null);
  const [witnessDetails, setWitnessDetails] = useState<string | null>(null);

  const [writtenSummon, setWrittenSummon] = useState<FileData | null>(null);
  const [writtenSummonError, setWrittenSummonError] = useState<string | null>(
    null
  );
  const globalStore = useGlobalStore((state: GlobalStore) => state);
  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (writtenSummon) {
      setIsLoading(true);
      await claimVM.submitTravelClaimLegalExpenseDocumentation(
        witnessDetails ?? '',
        eventDescription ?? '',

        writtenSummon,
        globalStore
      );
      setIsLoading(false);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'what happened'}
        title={'Circumstance surrounding event'}
        hintText={'Tell us the circumstances that surrounded this event'}
        maxLines={4}
        value={eventDescription ?? ''}
        control={control}
        onChanged={(text: string) => setEventDescription(text)}
        minMaxConstraint={'length'}
        minLength={4}
      />

      <ValidatedCustomFormTextField
        name={'what happened'}
        title={'Witness details discussing how it happened'}
        hintText={'Provide witness details description'}
        maxLines={4}
        value={witnessDetails ?? ''}
        control={control}
        onChanged={(text: string) => setWitnessDetails(text)}
        minMaxConstraint={'length'}
        minLength={4}
      />

      <ClaimImagePicker
        fieldName={'Written summon for third party'}
        label={'Written summon for third party'}
        imageData={writtenSummon}
        setImageData={setWrittenSummon}
        error={writtenSummonError}
        setError={setWrittenSummonError}
        required={true}
      />

      <VerticalSpacer height={20} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !writtenSummon || !witnessDetails || !eventDescription
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

export default TravelDocumentLegalExpenseScreen;
