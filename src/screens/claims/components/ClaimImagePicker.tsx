import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  type ImageLibraryOptions,
} from 'react-native-image-picker';

import type { FileData } from '../../purchase/form/components/CustomImagePicker';
import PickImageIcon from '../../../assets/icons/pick_image_icon.svg';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { HorizontalSpacer } from '../../../components/Spacer';
import {
  customTextStyles,
  RegularText,
  W500Text,
} from '../../../components/CustomText';
import { ColorUtils } from '../../../utils/colorUtils';

interface ClaimImagePickerProps {
  label: string;
  fieldName: string;
  imageData: FileData | null; // Passed from parent
  setImageData: (data: FileData | null) => void; // Passed from parent
  error: string | null;
  setError: (error: string | null) => void;
  padTop?: boolean;
  required?: boolean;
  labelWidget?: React.ReactNode;
}

const ClaimImagePicker: React.FC<ClaimImagePickerProps> = ({
  label,
  imageData,
  setImageData,
  error,
  setError,
  labelWidget,
}) => {
  // // const formGlobal = useFormStore((state: FormStore) => state);
  // const [imageData, setImageData] = useState<FileData | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const selectImage = async (source: 'gallery' | 'camera') => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      };

      const result =
        source === 'gallery'
          ? await launchImageLibrary(options)
          : await launchCamera(options);

      if (
        !result.didCancel &&
        !result.errorCode &&
        result.assets &&
        result.assets[0]
      ) {
        const { uri, fileName } = result.assets[0];

        const fileData: FileData = {
          uri: uri ?? '',
          name: fileName ?? '',
        };
        setImageData(fileData);
        // formGlobal.setImageList(fieldName, fileData);
        // formGlobal.setFormData(fieldName, fileData);
        setError(null);
      } else if (result.errorCode === 'permission') {
        console.log('Permission to access gallery was denied');
        setError('Permission to access gallery was denied');
      } else {
        console.log('User cancelled image picker');
      }
    } catch (err) {
      console.error('Error occurred while picking image:', err);
      setError('Error occurred while picking image');
    }
  };

  const removeImage = () => {
    setImageData(null);
    // formGlobal.setImageList(fieldName, null);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (imageData) {
          removeImage();
        } else {
          selectImage('gallery');
        }
      }}
      style={styles.container}
    >
      {/* <Text style={styles.label}>{label}</Text> */}

      <View style={styles.dottedBorder}>
        <View style={styles.imageContainer}>
          {imageData ? (
            <>
              <PickImageIcon
                width={24}
                height={24}
                fill={CustomColors.formHintColor}
              />
              <HorizontalSpacer width={10} />
              <Text
                style={[customTextStyles.regular, styles.uploadText]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {imageData.name}
              </Text>
              <View style={styles.removeContainer}>
                {/* <Text style={styles.removeText}>Remove</Text> */}
                <W500Text
                  title={'Remove'}
                  fontSize={13.5}
                  color={CustomColors.redColor}
                />
              </View>
            </>
          ) : (
            <>
              <RegularText
                title={'Upload'}
                fontSize={14}
                color={CustomColors.greyTextColor}
              />
              <HorizontalSpacer width={10} />
              {/* <View style={{flex: 1}}> */}
              {label ? (
                <Text
                  style={[customTextStyles.w500, styles.uploadText]}
                  // numberOfLines={1}
                  // ellipsizeMode="tail">
                >
                  {label || 'Choose an image'}
                </Text>
              ) : labelWidget ? (
                <View style={{ flex: 1 }}>{labelWidget}</View>
              ) : (
                <Text
                  style={[customTextStyles.w500, styles.uploadText]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {label || 'Choose an image'}
                </Text>
              )}
              {/* </View> */}

              <View
                style={[
                  styles.removeContainer,
                  { backgroundColor: DynamicColors().lightPrimaryColor },
                ]}
              >
                {/* <Text style={styles.removeText}>Remove</Text> */}
                <W500Text
                  title={'Upload'}
                  fontSize={13.5}
                  color={DynamicColors().primaryBrandColor}
                />
              </View>
            </>
          )}
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  uploadText: {
    flex: 1,
    fontSize: 16,
    color: CustomColors.backTextColor,
  },
  removeContainer: {
    backgroundColor: ColorUtils.hexToRgba(CustomColors.redColor, 0.07),
    borderRadius: 5,
    padding: 20,
    paddingVertical: 10,
  },
  dottedBorder: {
    borderStyle: 'dashed', // This creates the dotted effect
    borderWidth: 1,
    borderColor: '#999', // Dotted border color
    borderRadius: 5, // Optional: If you want rounded borders
    // padding: 10,
  },
  removeText: {
    fontSize: 14,
    color: 'red',
  },
  descriptionText: {
    fontSize: 13,
    color: '#999',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default ClaimImagePicker;
