import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import CustomButton from '../../../../components/CustomButton';
import { VerticalSpacer } from '../../../../components/Spacer';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import type { FileData } from '../../../purchase/form/components/CustomImagePicker';
import { ClaimViewModel } from '../../ClaimViewModel';

interface TravelDocumentBaggageDelayScreenProps {
  formKey: any;
}

const TravelDocumentBaggageDelayScreen: React.FC<
  TravelDocumentBaggageDelayScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  const [luggageCost, setLuggageCost] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [irregularityReport, setIrregularityReport] = useState<FileData | null>(
    null
  );
  const [irregularityReportError, setIrregularityReportError] = useState<
    string | null
  >(null);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (irregularityReport) {
      setIsLoading(true);
      await claimVM.submitTravelClaimBaggageDelayDocumentation(
        parseInt(luggageCost?.replace(',', '') ?? '', 10) ?? 0,
        irregularityReport
      );
      setIsLoading(true);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'Luggage cost'}
        title={'Luggage cost'}
        hintText={'Luggage cost'}
        isNumber={true}
        isCurrency={true}
        value={luggageCost ?? ''}
        control={control}
        onChanged={(text: string) => {
          setLuggageCost(text);
        }}
        // onChangeText={value => setAmount(Number(value.replace(/,/g, '')))}
        minMaxConstraint={'value'}
        minLength={10}
      />

      <ClaimImagePicker
        fieldName={'Property irregularity report'}
        label={'Property irregularity report'}
        imageData={irregularityReport}
        setImageData={setIrregularityReport}
        error={irregularityReportError}
        setError={setIrregularityReportError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <VerticalSpacer height={120} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !irregularityReport || !luggageCost
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

export default TravelDocumentBaggageDelayScreen;
