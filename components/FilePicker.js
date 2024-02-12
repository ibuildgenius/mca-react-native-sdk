import {Pressable} from 'react-native';
import {MCATextField} from './MCATextField';
import DocumentPicker from 'react-native-document-picker';
import {useState} from 'react';

export default function FilePicker(props) {
  let data = props.data;

  const [fileName, setFileName] = useState('');

  function pickFile() {
    try {
      DocumentPicker.pickSingle({
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

  return (
    <Pressable onPress={pickFile}>
      <MCATextField valueString={fileName} data={data} editable={false} />
    </Pressable>
  );
}
