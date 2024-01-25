import { View, Text, Pressable, Image } from "react-native"
import { styles } from "../style/styles";
import { getImage } from "../product_forms/ProductForms";
import Health from "../assets/health.svg";
import Gadget from "../assets/gadget.svg";
import Home from "../assets/home.svg";
import Hospital from "../assets/hospital.svg";
import Office from "../assets/office.svg";
import { colorNavy } from "../style/colors";
import {currencify} from "../api/constants";

export default function ProductListItem(props) {
    const data = props.data

    function resolveImage() {
        let name = data["name"].toLowerCase();

        let size = "30"

        if (name.includes("home")) {
            return <Home width={size} height={size} />
        } else if (name.includes("gadget")) {
            return <Gadget width={size} height={size} />
        } else if (name.includes("office")) {
            return <Office width={size} height={size} />
        } else if (name.includes("health") || name.includes("hospital")) {
            return <Hospital width={size} height={size} />
        } else {
            return <Health width={size} height={size} />
        }
    }

    function navigate() {
        props.navigator.navigate("ProductInfo", { productData: data })
    }


    function getIcon() {
        return getImage(data["prefix"], false)
    }

    let price = parseFloat(data["price"])
    return (
        <Pressable onPress={navigate} style={({ pressed }) => pressed && { opacity: 0.7 }}>
            <View style={styles.listItem}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    {resolveImage()}
                </View>
                <View style={{ flex: 5, marginHorizontal: 8 }}>

                    <Text style={{ marginBottom: 8, fontFamily: "Raleway_500Medium", fontWeight: "600", color: colorNavy }}>{data["name"]}</Text>

                    <View style={{ flexDirection: "row", marginTop: 2, alignItems: "center" }}>
                        <Text style={{ fontFamily: "Raleway_400Regular", color: "#667085", marginRight: 5 }} >{data["prefix"]}</Text>
                        {getIcon()}
                    </View>


                </View>
                <View style={{ flex: 2, flexDirection: "row-reverse", alignItems: "center" }}>
                    {(data["is_dynamic_pricing"]) ? (<Text>{price}%</Text>) : (<Text>₦{currencify(price)}</Text>)}

                </View>
            </View>
        </Pressable>

    );
}
