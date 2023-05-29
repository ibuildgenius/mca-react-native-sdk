import { Text, View, Image, Button, Alert } from "react-native";
import MCALayout from "../components/MCALayout";
import { colorPrimary } from "../style/colors";
import { styles } from "../style/styles";
import { useState } from "react";
import { MCATextField } from "../components/MCATextField";
import { MDatePicker } from "../components/MDatePicker"
import FilePicker from "../components/FilePicker";
import { BASE_URL, TOKEN } from "../api/constants";

export default function ProductForm({ navigation, route }) {

    let productData = route.params.data
    let transactionRef = route.params.transactionRef || ""
    //let existingFormData = route.params.formData

    const [formData, setFormData] = useState({})
    const [fieldIndex, setFieldIndex] = useState(0)
    const [files, setFiles] = useState([])

    let formFields = productData["form_fields"].filter((item) => { return (transactionRef.trim().length < 1) ? item["show_first"] : !item["show_first"] }).sort((a, b) => a.position - b.position)

    function updateData(key, value) {
        let newMap = formData
        newMap[key] = value
        setFormData(newMap)
    }

    function progressOrNavigate() {

        console.log(formData)

        if (fieldIndex < (chunkedFields().length - 1)) {
            setFieldIndex(fieldIndex + 1)
        } else {
            if (!transactionRef) {
                setFieldIndex(0)
                navigation.navigate("PaymentOptionScreen", { data: { product: productData, form: formData } })
            } else {
                completePurchase()
            }

        }
    }

    function chunkedFields() {
        let chunkSize = 3;

        let chunkedFields = []
        for (let i = 0; i < formFields.length; i += chunkSize) {
            const chunk = formFields.slice(i, i + chunkSize);
            chunkedFields.push(chunk)
        }

        return chunkedFields
    }

    function resolveFields() {
        let chunk = chunkedFields()[fieldIndex]

        return chunk
    }


    async function uploadFiles() {
        for (let i = 0; i < files.length; i++) {

            console.log(files[i].fileUri)

            const formData = new FormData()

            formData.append("file", { uri: files[i].fileUri, type: "image/png", name: "image_" + i })

            let headers = {
                "Authorization": "Bearer " + TOKEN,
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            }

            let url = BASE_URL + "/v1/upload-file"

            try {
                let response = await fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: formData
                })

                let json = await response.json()

                console.log(json)

                if (json["responseCode"] == 1) {
                    updateData(files[i].key, json["data"]["file_url"])
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    function completePurchase() {
        uploadFiles().then(() => {

            updateData("is_full_year", true)

            let url = BASE_URL + "/v1/sdk/complete-purchase"

            let headers = { "Authorization": "Bearer " + TOKEN, "Content-Type": "application/json" }

            let body = JSON.stringify({
                payload: formData,
                reference: transactionRef
            })

            console.log(formData)

            fetch(url, { method: "POST", headers: headers, body })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if (json["responseCode"] == 1) {
                        navigation.reset("SuccessScreen", { name: productData["name"] })
                    } else {
                        Alert.alert("Request Failed", json["responseText"])
                    }
                })
        })
    }


    function onFilePicked(key, file) {
        let pair = { key: key, fileUri: file.uri }
        console.log(key)
        setFiles(currentFiles => [...currentFiles, pair])
    }


    function onBackPressed() {
        if (fieldIndex > 0) {
            setFieldIndex(fieldIndex - 1)
        }
    }

    return (
        <MCALayout onBackPressed={onBackPressed}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: 400, padding: 12 }} >{productData["name"]}</Text>
                <Text style={{ padding: 5, backgroundColor: "#F6FEF9" }} >Enter Details as it appears on legal document</Text>
                <View style={{ flexDirection: "row", marginVertical: 12, alignItems: "center" }}>
                    <View style={{ flex: 1 }} ></View>
                    <Text>Underwritten By: </Text>
                    {getImage(productData["prefix"])}
                </View>
            </View>
            <View style={{ flex: 1 }}>
                {resolveFields().map((element) => {
                    let fieldType = element["input_type"]
                    let dataType = element["data_type"].toLowerCase();

                    function onDataChange(value) {
                        if (dataType == "number") {
                            updateData(element["name"], parseInt(value))
                        }
                        else if (dataType == "boolean") {
                            console.log(value)
                            updateData(element["name"], (value.toLowerCase() == "true") ? true : false)
                        } else {
                            updateData(element["name"], value)
                        }
                    }

                    switch (fieldType) {
                        case "file":
                            return <FilePicker onFilePicked={onFilePicked} data={element} />
                        case "date":
                            return <MDatePicker dateValueChanged={onDataChange} keyValue={element["label"]} editable={false} data={element} />
                        default:
                            return <MCATextField onDataChange={onDataChange} valueString={formData[element["name"]]} keyValue={element["label"]} editable={true} data={element} />
                    }
                })}
            </View>
            <Button onPress={progressOrNavigate} color={colorPrimary} title="Continue" />
        </MCALayout>
    );
}



export function getImage(name, showText = true) {
    let newName = name.toLowerCase();

    let style = { marginHorizontal: 5 }

    if (newName.includes("mcg") || newName.includes("mycovergenius")) {
        return <Image style={style} source={require("../assets/mcg.png")} />
    } else if (newName.includes("aiico")) {
        return <Image style={style} source={require("../assets/aiico.png")} />
    } else if (newName.includes("sti")) {
        return <Image style={style} source={require("../assets/sti.png")} />
    } else if (newName.includes("flexicare")) {
        return <Image style={style} source={require("../assets/flexicare.png")} />
    } else if (newName.includes("leadway")) {
        return <Image style={style} source={require("../assets/leadway.png")} />
    }
    else {
        if (showText === true)
            return <Text style={style} >{name.toUpperCase()}</Text>
        else
            return null
    }
}