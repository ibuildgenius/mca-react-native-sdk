import { Text, View, Image, Button } from "react-native";
import MCALayout from "../components/MCALayout";
import { colorPrimary } from "../style/colors";
import { styles } from "../style/styles";
import { useState } from "react";
import MCATextField, { MDatePicker } from "../components/MCATextField";

export default function ProductForm({ navigation, route }) {

    let productData = route.params.data

    let formFields = productData["form_fields"].filter((item) => item["show_first"]).sort((a, b) => a.position - b.position)

    let [fieldIndex, setFieldIndex] = useState(0)

    function getImage(name) {
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
            return <Text style={style} >{name.toUpperCase()}</Text>
        }
    }

    function progressOrNavigate() {

        console.log("chucked size " + chunkedFields().length)

        if (fieldIndex < (chunkedFields().length - 1)) {
            console.log("incrementing")
            setFieldIndex(fieldIndex + 1)
            console.log("field index " + fieldIndex)
        } else {
            console.log("navigating")
            navigation.navigate("PaymentOptionScreen", { data: productData })
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



    return (
        <MCALayout>
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

                    console.log(element)

                    let fieldType = element["input_type"]

                    switch (fieldType) {
                        case "file":
                            return <Text>File</Text>
                        case "date":
                            return <MDatePicker editable={false} data={element} />
                        default:
                            return <MCATextField editable={true} data={element} />
                    }
                })}
            </View>
            <Button onPress={progressOrNavigate} color={colorPrimary} title="Continue" />
        </MCALayout>
    );
}