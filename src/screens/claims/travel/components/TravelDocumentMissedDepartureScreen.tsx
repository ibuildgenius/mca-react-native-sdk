import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../../components/CustomButton';
import { VerticalSpacer } from '../../../../components/Spacer';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import type { FileData } from '../../../purchase/form/components/CustomImagePicker';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import { ClaimViewModel } from '../../ClaimViewModel';
import { GlobalStore, useGlobalStore } from '../../../../store/globalStore';
// import { useGlobalStore, type GlobalStore } from 'store/globalStore';

interface TravelDocumentMissedDepartureScreenProps {
  formKey: any;
}

const TravelDocumentMissedDepartureScreen: React.FC<
  TravelDocumentMissedDepartureScreenProps
> = () => {
  const { control, handleSubmit } = useForm();

  // State for handling form fields
  const [missedDepartureReason, setMissedDepartureReason] = useState<
    string | null
  >(null);

  const [transporterReport, setTransporterReport] = useState<FileData | null>(
    null
  );
  const [transporterReportError, setTransporterReportError] = useState<
    string | null
  >(null);

  const [otherReport, setOtherReport] = useState<FileData | null>(null);
  const [otherReportError, setOtherReportError] = useState<string | null>(null);
  const globalStore = useGlobalStore((state: GlobalStore) => state);
  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (transporterReport && otherReport) {
      setIsLoading(true);
      await claimVM.submitTravelClaimMissedDepartureDocumentation(
        missedDepartureReason ?? '',
        otherReport,
        transporterReport,
        globalStore
      );
      setIsLoading(false);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'what happened'}
        title={'Tell us the reason for missed departure'}
        hintText={'Tell us the reason for missed departure'}
        maxLines={4}
        value={missedDepartureReason ?? ''}
        control={control}
        onChanged={(text: string) => setMissedDepartureReason(text)}
        minMaxConstraint={'length'}
        minLength={4}
      />

      <ClaimImagePicker
        fieldName={'Evidence of cash during the journey'} // '(ATM, receipt, debit alert e.t.c)'
        label={'Evidence of cash during the journey'}
        imageData={transporterReport}
        setImageData={setTransporterReport}
        error={transporterReportError}
        setError={setTransporterReportError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Evidence from authority handling the private vehicle'}
        label={'Evidence from authority handling the private vehicle'}
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
          !missedDepartureReason || !transporterReport || !otherReport
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

export default TravelDocumentMissedDepartureScreen;
