import {Pressable} from 'react-native';
import {MCATextField} from './MCATextField';
import {MCAImageTextField} from './MCAImageTextField';

import DocumentPicker from 'react-native-document-picker';
import {useState} from 'react';
import { launchImageLibrary} from 'react-native-image-picker'

export default function FilePicker(props) {
  let data = props.data;

  const [fileName, setFileName] = useState('');

  function pickFile() {
    try {
      DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        presentationStyle: 'fullScreen',
      }).then(docResult => {
        setFileName(docResult.name);
        props.onFilePicked(data.name, docResult);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }

  const pickIosImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      };

      const result = await launchImageLibrary(options);
  
      if (!result.didCancel && !result.errorCode) {
        const { uri, fileName } = result.assets[0];
        setFileName(fileName);
        props.onFilePicked(data.name, {uri:uri, name:fileName});
      } else if (result.errorCode === 'permission') {
        console.log('Permission to access gallery was denied');
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.error('Error occurred while picking image:', error);
    }
  };


  

  return (
    (Platform.OS === "ios") ?
    <Pressable onPress={pickIosImage}>
      <MCAImageTextField valueString={fileName} data={data} editable={false} />
    </Pressable>
    :
    <Pressable onPress={pickFile}>
      <MCAImageTextField valueString={fileName} data={data} editable={false} />
    </Pressable>

  );
}