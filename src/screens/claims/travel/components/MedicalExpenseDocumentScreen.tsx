import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import { VerticalSpacer } from '../../../../components/Spacer';
import CustomButton from '../../../../components/CustomButton';
import type { FileData } from '../../../purchase/form/components/CustomImagePicker';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import { ClaimViewModel } from '../../ClaimViewModel';

interface MedicalExpenseDocumentScreenProps {
  formKey: any;
}

const MedicalExpenseDocumentScreen: React.FC<
  MedicalExpenseDocumentScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  // State for handling form fields
  // const [amount, setAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [medicalCost, setMedicalCost] = useState<string | null>(null);

  const [medicalReceipt, setMedicalReceipt] = useState<FileData | null>(null);
  const [medicalReceiptError, setMedicalReceiptError] = useState<string | null>(
    null
  );

  const [medicalCertificate, setMedicalCertificate] = useState<FileData | null>(
    null
  );
  const [medicalCertificateError, setMedicalCertificateError] = useState<
    string | null
  >(null);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (medicalReceipt && medicalCertificate) {
      setIsLoading(true);
      await claimVM.submitTravelClaimMedicalDocumentation(
        parseInt(medicalCost?.replace(',', '') ?? '', 10) ?? 0,
        medicalReceipt,
        medicalCertificate
      );
      setIsLoading(false);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'Medical cost'}
        title={'Medical cost'}
        hintText={'Medical cost'}
        isNumber={true}
        isCurrency={true}
        value={medicalCost ?? ''}
        control={control}
        onChanged={(text: string) => {
          setMedicalCost(text);
        }}
        // onChangeText={value => setAmount(Number(value.replace(/,/g, '')))}
        minMaxConstraint={'value'}
        minLength={10}
      />

      <ClaimImagePicker
        fieldName={'Medical receipt'}
        label={'Medical receipt'}
        imageData={medicalReceipt}
        setImageData={setMedicalReceipt}
        error={medicalReceiptError}
        setError={setMedicalReceiptError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Medical certificate'}
        label={'Medical certificate'}
        imageData={medicalCertificate}
        setImageData={setMedicalCertificate}
        error={medicalCertificateError}
        setError={setMedicalCertificateError}
        required={true}
      />

      <VerticalSpacer height={80} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !medicalReceipt || !medicalCertificate || !medicalCost
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

export default MedicalExpenseDocumentScreen;
