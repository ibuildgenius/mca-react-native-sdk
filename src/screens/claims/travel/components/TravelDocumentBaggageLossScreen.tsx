import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form'; // Assuming you have a custom RichText component
import ClaimImagePicker from '../../components/ClaimImagePicker';
import { VerticalSpacer } from '../../../../components/Spacer';
import CustomButton from '../../../../components/CustomButton';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import type { FileData } from '../../../purchase/form/components/CustomImagePicker';
import { ClaimViewModel } from '../../ClaimViewModel';

interface TravelDocumentBaggageLossScreenProps {
  formKey: any;
}

const TravelDocumentBaggageLossScreen: React.FC<
  TravelDocumentBaggageLossScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  const [luggageCost, setLuggageCost] = useState<string | null>(null);

  const [purchaseReceipt, setPurchaseReceipt] = useState<FileData | null>(null);
  const [purchaseReceiptError, setPurchaseReceiptError] = useState<
    string | null
  >(null);

  const [policeReport, setPoliceReport] = useState<FileData | null>(null);
  const [policeReportError, setPoliceReportError] = useState<string | null>(
    null
  );

  const [repairEstimate, setRepairEstimate] = useState<FileData | null>(null);
  const [repairEstimateError, setRepairEstimateError] = useState<string | null>(
    null
  );

  const [otherReport, setOtherReport] = useState<FileData | null>(null);
  const [otherReportError, setOtherReportError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (purchaseReceipt && policeReport && repairEstimate && otherReport) {
      setIsLoading(true);
      await claimVM.submitTravelClaimBaggageLossDocumentation(
        parseInt(luggageCost?.replace(',', '') ?? '', 10) ?? 0,
        purchaseReceipt,
        policeReport,

        repairEstimate,
        otherReport
      );

      setIsLoading(false);
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
        fieldName={'Evidence of purchase'}
        label={'Evidence of purchase'}
        imageData={purchaseReceipt}
        setImageData={setPurchaseReceipt}
        error={purchaseReceiptError}
        setError={setPurchaseReceiptError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Police report'}
        label={'Police report'}
        imageData={policeReport}
        setImageData={setPoliceReport}
        error={policeReportError}
        setError={setPoliceReportError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Written report from hotel / apartment manager'}
        label={'Written report from hotel / apartment manager'}
        imageData={repairEstimate}
        setImageData={setRepairEstimate}
        error={repairEstimateError}
        setError={setRepairEstimateError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Estimate of repair of damage item'}
        label={'Estimate of repair of damage item'}
        imageData={otherReport}
        setImageData={setOtherReport}
        error={otherReportError}
        setError={setOtherReportError}
        required={true}
      />

      <VerticalSpacer height={20} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !purchaseReceipt ||
          !policeReport ||
          !repairEstimate ||
          !policeReport ||
          !repairEstimate ||
          !otherReport
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

export default TravelDocumentBaggageLossScreen;
