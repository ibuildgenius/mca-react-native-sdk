import {ActivityIndicator, Alert, Button, Image, Text, View} from "react-native";
import MCALayout from "../components/MCALayout";
import {colorGreyOverlay, colorPrimary} from "../style/colors";
import {useState} from "react";
import {MCATextField} from "../components/MCATextField";
import {MDatePicker} from "../components/MDatePicker"
import FilePicker from "../components/FilePicker";
import ItemPair from "../components/ItemPair";
import SuccessScreen from "../components/SuccessScreen";
import {useApiKeyStore} from "../store/urlApiKeyStore";

export default function ProductForm({ navigation, route }) {

    let {apiKey,baseUrl} = useApiKeyStore();
    let productData = route.params.data
    let transactionRef = route.params.transactionRef || ""
    //let existingFormData = route.params.formData

    const [formData, setFormData] = useState({})
    const [fieldIndex, setFieldIndex] = useState(0)
    const [files, setFiles] = useState([])
    const [complete, setComplete] = useState(false)
    const [busy, setBusy] = useState(false)

    let formFields = productData["form_fields"].filter((item) => { return (transactionRef.trim().length < 1) ? item["show_first"] : !item["show_first"] }).sort((a, b) => a.position - b.position)

    function updateData(key, value) {
        let newMap = formData
        newMap[key] = value
        setFormData(newMap)
    }

    function progressOrNavigate() {
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
        return chunkedFields()[fieldIndex]
    }


    async function uploadFiles() {
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData()

            formData.append("file", { uri: files[i].fileDetail.uri, type: "image/png", name: files[i].fileDetail.name })

            let headers = {
                "Authorization": "Bearer " + apiKey,
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            }

            let url = baseUrl + "/v1/upload-file"

            try {
                let response = await fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: formData
                })

                let json = await response.json()

                if (json["responseCode"] == 1) {
                    updateData(files[i].key, json["data"]["file_url"])
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    function completePurchase() {

        setBusy(true)

        uploadFiles().then(() => {

            updateData("is_full_year", true)

            let url = baseUrl + "/v1/sdk/complete-purchase"

            let headers = { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" }

            let body = JSON.stringify({
                payload: formData,
                reference: transactionRef
            })
            fetch(url, { method: "POST", headers: headers, body })
                .then((response) => response.json())
                .then((json) => {
                    if (json["responseCode"] == 1) {
                        setComplete(true)
                    } else {
                        Alert.alert("Request Failed", json["responseText"])
                    }
                }).finally(() => setBusy(false))
        })
    }


    function onFilePicked(key, file) {
        let pair = { key: key, fileDetail: { uri: file.uri, name: file.name } }
        setFiles(currentFiles => [...currentFiles, pair])
    }


    function onBackPressed() {
        if (fieldIndex > 0) {
            setFieldIndex(fieldIndex - 1)
        }
    }

    function onDone() {
        navigation.navigate("ProductList")
    }

    if (complete)

        return (
            <SuccessScreen message={"Your purchase for " + productData["name"] + " was successful."} onDonePressed={onDone} />
        )

    else
        return (
            <View style={{ flex: 1 }}>
                <MCALayout onBackPressed={onBackPressed}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", padding: 12, fontFamily: "Raleway_500Medium" }} >{productData["name"]}</Text>
                        <Text style={{ padding: 5, width: "100%", fontFamily: "Raleway_400Regular", backgroundColor: "#F6FEF9" }} >Enter Details as it appears on legal document</Text>
                        <View style={{ flexDirection: "row", marginVertical: 12, alignItems: "center" }}>
                            <View style={{ flex: 1 }} ></View>
                            <Text style={{ fontFamily: "Raleway_400Regular" }}>Underwritten By: </Text>
                            {getImage(productData["prefix"])}
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {resolveFields().map((element, index) => {
                            let fieldType = element["input_type"]
                            let dataType = element["data_type"].toLowerCase();

                            function onDataChange(value) {
                                if (dataType == "array") {
                                    updateData(element["name"], value)
                                } else if (dataType == "number") {
                                    updateData(element["name"], parseInt(value))
                                }
                                else if (dataType == "boolean") {
                                    updateData(element["name"], (value.toLowerCase() == "true") ? true : false)
                                } else {
                                    updateData(element["name"], value)
                                }
                            }


                            if (dataType == "array") {
                                return <ItemPair key={index} onUpdate={onDataChange} data={element} />
                            }

                            switch (fieldType) {
                                case "file":
                                    return <FilePicker key={index} onFilePicked={onFilePicked} data={element} />
                                case "date":
                                    return <MDatePicker key={index} dateValueChanged={onDataChange} keyValue={element["label"]} editable={false} data={element} />
                                default:
                                    return <MCATextField onDataChange={onDataChange} valueString={formData[element["name"]]} keyValue={element["label"]} editable={true} data={element} />
                            }
                        })}
                    </View>
                    <Button onPress={progressOrNavigate} color={colorPrimary} title="Continue" />
                </MCALayout>
                {(busy) ? <View style={{ zIndex: 2, flex: 1, height: "100%", width: "100%", marginTop: "6%", position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: colorGreyOverlay }}>
                    <ActivityIndicator style={{ margin: 12, color: "#3BAA90" }} animating={true} />
                    <Text style={{ fontFamily: "Raleway_500Medium", margin: 12, fontSize: 16, color: "white" }} > Sending request... </Text>

                </View>
                    : null

                }

            </View>

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
