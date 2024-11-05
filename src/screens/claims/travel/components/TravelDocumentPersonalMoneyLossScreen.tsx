import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../../components/CustomButton';
import { VerticalSpacer } from '../../../../components/Spacer';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import type { FileData } from '../../../purchase/form/components/CustomImagePicker';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import { ClaimViewModel } from '../../ClaimViewModel';

interface TravelDocumentPersonalMoneyLossScreenProps {
  formKey: any;
}

const TravelDocumentPersonalMoneyLossScreen: React.FC<
  TravelDocumentPersonalMoneyLossScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  const [cashValue, setCashValue] = useState<string | null>(null);

  const [debitReceipt, setDebitReceipt] = useState<FileData | null>(null);
  const [debitReceiptError, setDebitReceiptError] = useState<string | null>(
    null
  );

  const [policeReport, setPoliceReport] = useState<FileData | null>(null);
  const [policeReportError, setPoliceReportError] = useState<string | null>(
    null
  );

  const [otherReport, setOtherReport] = useState<FileData | null>(null);
  const [otherReportError, setOtherReportError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (policeReport && debitReceipt && otherReport) {
      setIsLoading(true);
      await claimVM.submitTravelClaimPersonalMoneyDocumentation(
        parseInt(cashValue?.replace(',', '') ?? '', 10) ?? 0,
        policeReport,
        debitReceipt,
        otherReport
      );

      setIsLoading(false);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'Cash value'}
        title={'Cash value'}
        hintText={'Cash value'}
        isNumber={true}
        isCurrency={true}
        value={cashValue ?? ''}
        control={control}
        onChanged={(text: string) => {
          setCashValue(text);
        }}
        // onChangeText={value => setAmount(Number(value.replace(/,/g, '')))}
        minMaxConstraint={'value'}
        minLength={10}
      />
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
        fieldName={'Evidence of cash during the journey'} // '(ATM, receipt, debit alert e.t.c)'
        label={'Evidence of cash during the journey'}
        imageData={debitReceipt}
        setImageData={setDebitReceipt}
        error={debitReceiptError}
        setError={setDebitReceiptError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Written report from hotel / apartment manager'}
        label={'Written report from hotel / apartment manager'}
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
          !policeReport || !debitReceipt || !otherReport || !policeReport
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

export default TravelDocumentPersonalMoneyLossScreen;
