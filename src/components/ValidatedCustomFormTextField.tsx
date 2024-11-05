import React from 'react';
import { Controller } from 'react-hook-form';
import { CustomValidator } from '../utils/CustomValidator';
import { VerticalSpacer } from './Spacer';
import { RegularText } from './CustomText';
import { CustomColors } from '../constants/CustomColors';
import CustomFormTextField from './customFormTextField';

// Define the prop types
interface ValidatedCustomFormTextFieldProps {
  name: string;
  title?: string;
  hintText?: string;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  initialValue?: string;
  isCurrency?: boolean;
  isNumber?: boolean;
  obscureText?: boolean;
  readOnly?: boolean;
  maxLines?: number;
  maxLength?: number;
  minMaxConstraint: string | null;
  inputType?: string;
  minLength: number | null;
  suffix?: React.ReactNode;
  helperText?: string;
  control: any; // Use appropriate type for control (react-hook-form types)
  onSuffixTap?: () => void;
  onChanged: (value: string) => void;
  value: string;
}

const ValidatedCustomFormTextField: React.FC<
  ValidatedCustomFormTextFieldProps
> = ({
  name,
  title,
  hintText,
  prefixIcon,
  suffixIcon,
  initialValue = '',
  inputType = '',
  isCurrency = false,
  isNumber = false,
  obscureText = false,
  readOnly = false,
  maxLines = 1,

  maxLength,
  minMaxConstraint,
  minLength,
  suffix,
  // helperText,
  control,
  onSuffixTap,
  onChanged,
  value,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={initialValue}
      rules={{
        validate: (value) =>
          CustomValidator.generalValidator({
            value,
            name: name,
            label: name,
            dataType: null,
            inputType: inputType,
            minMaxConstraint: minMaxConstraint,
            errorMsg: null,
            min: minLength,
            max: null,
          }),
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <>
          <CustomFormTextField
            name={name}
            title={title}
            hintText={hintText}
            prefixIcon={prefixIcon}
            suffixIcon={suffixIcon}
            readOnly={readOnly}
            isNumber={isNumber}
            isCurrency={isCurrency}
            obscureText={obscureText}
            maxLines={maxLines}
            maxLength={maxLength}
            suffix={suffix}
            onSuffixTap={onSuffixTap}
            onChanged={(val) => {
              onChange(val);
              onChanged(val); // Call the custom onChanged prop
            }}
            value={value}
          />
          {error && (
            <>
              <VerticalSpacer height={2} />
              <RegularText
                title={error.message ?? ''}
                fontSize={13}
                color={CustomColors.redColor}
              />
            </>
          )}
          <VerticalSpacer height={23} />
        </>
      )}
    />
  );
};

export default ValidatedCustomFormTextField;
