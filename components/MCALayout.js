import { View, Text, Image, Pressable } from "react-native"
import { styles } from "../style/styles"
import { colorPrimary } from "../style/colors"

export default function MCALayout(props) {
    return (
        <View style={styles.appContainer}>
            <View style={styles.spacerHorizontal}></View>
            {(!props.onBackPressed) ? <></> : <View style={{ flexDirection: "row" }}>
                <Pressable onPress={props.onBackPressed}>
                    <Image source={require('../assets/back.png')} />
                </Pressable>
            </View>}

            <View style={{ flex: 1, alignItems: "center" }}>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
                <View style={{ flex: 1, width: "100%" }}>
                    {props.children}
                </View>
                <Image style={styles.poweredBy} source={require("../assets/powered_by.png")} />
            </View>
        </View>
    )
}