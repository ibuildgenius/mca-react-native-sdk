import { Pressable, View } from "react-native"
import { MCATextField } from "./MCATextField";
import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";


export default function FilePicker(props) {
    let data = props.data

    const [fileName, setFileName] = useState("")

    function pickFile() {
        DocumentPicker.getDocumentAsync()
            .then((docResult) => {

                if (docResult.type.toLowerCase() == "success") {
                    setFileName(docResult.name)
                    props.onFilePicked(data["name"], docResult)
                }
            })
    }

    return (
        <Pressable onPress={pickFile}>
            <MCATextField valueString={fileName} data={data} editable={false} />
        </Pressable>
    );
}
