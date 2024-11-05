import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../../components/CustomButton';
import { VerticalSpacer } from '../../../../components/Spacer';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import type { FileData } from '../../../purchase/form/components/CustomImagePicker';
import { ClaimViewModel } from '../../ClaimViewModel';

interface TravelDocumentLossScreenProps {
  formKey: any;
}

const TravelDocumentLossScreen: React.FC<
  TravelDocumentLossScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  const [passportCost, setPassportCost] = useState<string | null>(null);

  const [consulateConfirmationReport, setConsulateConfirmationReport] =
    useState<FileData | null>(null);
  const [
    consulateConfirmationReportError,
    setConsulateConfirmationReportError,
  ] = useState<string | null>(null);

  const [policeReport, setPoliceReport] = useState<FileData | null>(null);
  const [policeReportError, setPoliceReportError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (policeReport && consulateConfirmationReport) {
      setIsLoading(true);
      await claimVM.submitTravelClaimLossDocumentation(
        parseInt(passportCost?.replace(',', '') ?? '', 10) ?? 0,
        consulateConfirmationReport,
        policeReport
      );

      setIsLoading(false);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'Cost for issuing temporary passport'}
        title={'Cost for issuing temporary passport'}
        hintText={'Cost for issuing temporary passport'}
        isNumber={true}
        isCurrency={true}
        value={passportCost ?? ''}
        control={control}
        onChanged={(text: string) => {
          setPassportCost(text);
        }}
        // onChangeText={value => setAmount(Number(value.replace(/,/g, '')))}
        minMaxConstraint={'value'}
        minLength={10}
      />

      {/* <VerticalSpacer height={10} /> */}

      <ClaimImagePicker
        fieldName={'Confirmation from consulate'}
        label={'Confirmation from consulate'}
        imageData={consulateConfirmationReport}
        setImageData={setConsulateConfirmationReport}
        error={consulateConfirmationReportError}
        setError={setConsulateConfirmationReportError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Medical certificate'}
        label={'Medical certificate'}
        imageData={policeReport}
        setImageData={setPoliceReport}
        error={policeReportError}
        setError={setPoliceReportError}
        required={true}
      />

      <VerticalSpacer height={80} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !consulateConfirmationReport || !policeReport || !passportCost
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

export default TravelDocumentLossScreen;
