import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  type ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { type FormStore, useFormStore } from '../../../../store/formStore';
import {
  CustomColors,
  DynamicColors,
} from '../../../../constants/CustomColors';
import {
  customTextStyles,
  RegularText,
  W500Text,
} from '../../../../components/CustomText';
import { ColorUtils } from '../../../../utils/colorUtils';
import { HorizontalSpacer } from '../../../../components/Spacer';
import PickImageIcon from '../../../../assets/icons/pick_image_icon.svg';
import FileRepository from '../../../../data/repositories/file_repo';

interface CustomImageUploaderProps {
  fieldName: string;
  label: string;
}
export interface FileData {
  uri: string;
  name: string;
}

const fileRepository = new FileRepository();

const CustomImageUploader: React.FC<CustomImageUploaderProps> = ({
  fieldName,
  label,
}) => {
  const formGlobal = useFormStore((state: FormStore) => state);
  const [_isLoading, setIsLoading] = useState(false);

  // const [fileName, setFileName] = useState('');

  const selectImage = async () => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      };

      const result = await launchImageLibrary(options);

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

        setIsLoading(true);
        // Your video upload logic here

        const res = await fileRepository.uploadFile(fileData!, 'image');

        if ((res.responseCode = 1)) {
          formGlobal.removeFormError(fieldName);

          formGlobal.setTempImagePlaceholder(fieldName, fileName ?? '');

          formGlobal.setGlobalItemPair(fieldName, res.data.file_url);
        }

        setIsLoading(false);

        // formGlobal.removeFormError(fieldName);

        // formGlobal.setTempImagePlaceholder(fieldName, fileName ?? '');
        // console.log(fieldName);
        // console.log(formGlobal.tempImagePlaceholder.get(fieldName));
        // console.log(fileName);

        // console.log(formGlobal.tempImagePlaceholder);
        // console.log(formGlobal.tempImagePlaceholder);

        // formGlobal.setGlobalItemPair(fieldName, fileData);

        // formGlobal.formData
      } else if (result.errorCode === 'permission') {
        console.log('Permission to access gallery was denied');
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.error('Error occurred while picking image:', error);
    }
  };

  const removeImage = () => {
    formGlobal.removeTempImagePlaceholder(fieldName);
    formGlobal.removeGlobalItemPair(fieldName);
  };

  return (
    <TouchableOpacity
      onPress={
        // () => {
        //   console.log(fieldName);
        //   console.log(formGlobal.tempImagePlaceholder.get(fieldName));
        // }
        formGlobal.tempImagePlaceholder.get(fieldName) == null
          ? selectImage
          : removeImage
      }
      style={styles.container}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dottedBorder}>
        <View style={styles.imageContainer}>
          {formGlobal.tempImagePlaceholder.get(fieldName) ? (
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
                {formGlobal.tempImagePlaceholder.get(fieldName)}
              </Text>
              <View style={styles.removeContainer}>
                {/* <Text style={styles.removeText}>Remove</Text> */}
                <W500Text
                  title={'Remove'}
                  fontSize={13.5}
                  color={CustomColors.redColor}
                />
              </View>
              {/* <Text style={styles.removeText}>Remove</Text> */}
            </>
          ) : (
            // <>
            //   <Text style={styles.uploadText}>Upload</Text>
            //   <Text style={styles.descriptionText}>{description}</Text>
            // </>

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
  // dottedBorder: {
  //   padding: 0,
  //   width: '100%',
  //   height: 46,
  // },
  dottedBorder: {
    borderStyle: 'dashed', // This creates the dotted effect
    borderWidth: 1,
    borderColor: '#999', // Dotted border color
    borderRadius: 5, // Optional: If you want rounded borders
    // padding: 10,
  },
  // imageContainer: {
  //   width: '100%',
  //   height: 46,
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: 10,
  //   backgroundColor: '#f9f9f9',
  // },

  imageContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 30,
    height: 30,
  },
  uploadText: {
    flex: 1,
    fontSize: 15,
    color: CustomColors.backTextColor,
  },
  removeText: {
    fontSize: 14,
    color: 'red',
  },
  descriptionText: {
    fontSize: 13,
    color: '#999',
  },
  removeContainer: {
    backgroundColor: ColorUtils.hexToRgba(CustomColors.redColor, 0.07),
    borderRadius: 5,
    padding: 20,
    paddingVertical: 10,
  },
});

export default CustomImageUploader;
