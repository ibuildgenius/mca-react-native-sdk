import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import MCALayout from "../components/MCALayout";
import { useEffect, useState } from "react";
import { BASE_URL, instanceId } from "../api/constants";

export default function PaymentOption({ navigation, route }) {
    let product = route.params.data.product
    let formData = route.params.data.form
    let [loading, setLoading] = useState(false)
    let [paymentDetails, setPaymentDetails] = useState({})

    const [paymentString, setPaymentString] = useState("bank transfer")

    function failedDialog(message) {
        Alert.alert("Transaction Failed", message)
    }

    function initiatePurchase() {

        formData["product_id"] = product["product_id"]

        console.log(product["product_id"])

        let payload = {
            instance_id: global.instanceId,
            "payment_channel": {
                channel: paymentString
            },
            payload: formData
        }

        setLoading(true)

        let url = BASE_URL + "/v1/sdk/initiate-purchase"

        const token = "MCAPUBK_TEST|84afcf91-1804-470b-be22-5ea194d9f083"

        const headers = { "Authorization": "Bearer " + token, "Content-Type": "application/json" }

        let jsonBody = JSON.stringify(payload)

        fetch(url, { method: "POST", headers: headers, body: jsonBody })
            .then((response) => response.json())
            .then((json) => {
                if (json["responseCode"]) {
                    setPaymentDetails = json
                } else {
                    failedDialog(json["responseText"])
                }
            }).catch((error) => { })
            .finally(() => setLoading(false))
    }

    return (
        <MCALayout>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1 }}>
                    <View style={style.bio}>
                        <Text style={{ fontSize: 16, color: "#98A2B3" }}>{product["name"]}</Text>
                        <Text style={{ color: "#98A2B3" }}>{formData["email"]}</Text>
                    </View>

                    <Text style={{ marginTop: 18, fontSize: 18, fontWeight: "600" }}>Select Payment Method</Text>
                    <Text style={{ color: "#667085", marginTop: 5, marginBottom: 15, fontSize: 14, }} >Choose an option to proceed</Text>

                    <PaymentOptionCard imagePath={require("../assets/transfer.png")} selected={paymentString == "bank-transfer"} title="Transfer" sub="Send to bank account" />
                    <View style={{ opacity: 0.2 }}>
                        <PaymentOptionCard imagePath={require("../assets/ussd.png")} selected={paymentString == "ussd"} title="USSD" sub="Select any bank to generate USSD" />
                    </View>
                </View>
                <Button title="Get Covered" onPress={initiatePurchase} color="#3BAA90" />
            </View>

        </MCALayout>
    );
}

const style = StyleSheet.create({
    bio: {
        padding: 8,
        marginVertical: 8,
        alignItems: "flex-end",
        backgroundColor: "#F6FEF9",
        borderRadius: 5,
    }
});


export function PaymentOptionCard(props) {
    let style = StyleSheet.create({
        card: {
            marginVertical: 8,
            flexDirection: "row",
            paddingVertical: 12,
            borderWidth: 1,
            paddingHorizontal: 8,
            borderColor: "#667085",
            borderRadius: 5
        },
        cardSelected: {
            marginVertical: 8,
            flexDirection: "row",
            paddingVertical: 12,
            borderWidth: 1,
            paddingHorizontal: 8,
            borderColor: "#3BAA90",
            borderRadius: 5
        }
    });
    const selected = props.selected
    return (
        <View style={selected ? style.cardSelected : style.card}>
            <Image source={props.imagePath} />
            <View style={{ marginHorizontal: 12 }}>
                <Text style={{ fontWeight: "600", fontSize: 15 }} >{props.title}</Text>
                <Text style={{ marginTop: 5, fontSize: 12, }}>{props.sub}</Text>
            </View>
        </View>
    );
}