import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { type FormStore, useFormStore } from '../../../../store/formStore';
import { FormDataUrlResponse } from '../../../../models/FormDataUrlResponse';
import { FormViewModel } from '../FormViewModel';
import { customTextStyles, W500Text } from '../../../../components/CustomText';
import {
  CustomColors,
  DynamicColors,
} from '../../../../constants/CustomColors';
import { VerticalSpacer } from '../../../../components/Spacer';

interface CustomDropdownFieldProps {
  label: string;
  placeholder: string;
  fieldName: string;
  dataUrl: string;
  onSelect: (value: string) => void; // New prop for selecting value
  shouldUseGlobalItemPair?: boolean;
  // data: Array<{label: string; value: string}>;
}

const CustomDropdownField: React.FC<CustomDropdownFieldProps> = ({
  label,
  placeholder,
  dataUrl,
  fieldName,

  onSelect,

  shouldUseGlobalItemPair = false,

  // data,
}) => {
  const [_value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const formGlobal = useFormStore((state: FormStore) => state);
  const formVM = FormViewModel();

  var data: FormDataUrlResponse[] = formGlobal.urlFormData.get(fieldName) ?? [];

  useEffect(() => {
    const fetchData = async () => {
      if (data.length === 0) {
        try {
          await formVM.getListData(dataUrl ?? '', fieldName ?? '');
          data = formGlobal.urlFormData.get(fieldName) ?? [];
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const updateFormData = async (value: String) => {
    if (shouldUseGlobalItemPair) {
      formGlobal.setGlobalItemPair(fieldName, value);
    } else {
      formGlobal.setFormData(fieldName, value);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} extraHeight={100}>
      <W500Text title={label} fontSize={16} color={CustomColors.blackColor} />

      <VerticalSpacer height={9} />
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: DynamicColors().primaryBrandColor },
        ]}
        data={data}
        search={data.length > 6}
        searchPlaceholder="Search..."
        labelField="name"
        valueField="name"
        iconStyle={styles.iconStyle}
        // placeholder={!isFocus ? placeholder : '...'}
        placeholder={placeholder}
        placeholderStyle={[
          customTextStyles.regular,
          { fontSize: 15.5, color: CustomColors.greyTextColor },
        ]}
        selectedTextStyle={[
          customTextStyles.regular,
          { fontSize: 15.5, color: CustomColors.blackTextColor },
        ]}
        itemTextStyle={[
          customTextStyles.regular,
          { fontSize: 15.5, color: CustomColors.blackTextColor },
        ]}
        // value={value}
        value={
          shouldUseGlobalItemPair
            ? formGlobal.globalItemPair[fieldName]
            : formGlobal.formData[fieldName]
        }
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.name);
          updateFormData(item.name);
          onSelect(item.name);
        }}
      />
      <VerticalSpacer height={5} />
      {/* </View> */}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderColor: CustomColors.dividerGreyColor,
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: CustomColors.backBorderColor,
  },
  iconStyle: {
    // marginRight: 10,
    height: 28,
  },
});

export default CustomDropdownField;
