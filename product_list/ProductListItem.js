import { View, Text, Pressable, Image } from "react-native"
import { styles } from "../style/styles";

export default function ProductListItem(props) {
    const data = props.data

    function resolveImage() {
        let name = data["name"].toLowerCase();

        if (name.includes("home")) {
            return require("../assets/home.png")
        } else if (name.includes("gadget")) {
            return require("../assets/gadget.png")
        } else if (name.includes("office")) {
            return require("../assets/office.png")
        } else if (name.includes("health") || name.includes("hospital")) {
            return require("../assets/hospital.png")
        } else {
            return require("../assets/health.png")
        }
    }

    function navigate() {
        props.navigator.navigate("ProductInfo", { productData: data })
    }


    let price = parseFloat(data["price"])
    return (
        <Pressable onPress={navigate} style={({ pressed }) => pressed && { opacity: 0.7 }}>
            <View style={styles.listItem}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Image style={styles.listImage} source={resolveImage()} />

                </View>
                <View style={{ flex: 5 }}>
                    <Text style={{ marginBottom: 8 }}>{data["name"]}</Text>
                    <Text>{data["prefix"]}</Text>
                </View>
                <View style={{ flex: 2, flexDirection: "row-reverse", alignItems: "center" }}>
                    {(price > 1000) ? (<Text>N {price}</Text>) : (<Text>% {price}</Text>)}

                </View>
            </View>
        </Pressable>

    );
}