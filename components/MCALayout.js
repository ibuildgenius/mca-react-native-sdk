import { View, Text, Image } from "react-native"
import { styles } from "../style/styles"
import { colorPrimary } from "../style/colors"

export default function MCALayout(props) {
    return (
        <View style={styles.appContainer}>
            <View style={{ flex: 1, alignItems: "center" }}>

                <Image style={styles.logo} source={require("../assets/logo.png")} />
                <View style={{ flex: 1 }}>
                    {props.children}
                </View>
                <Image style={styles.poweredBy} source={require("../assets/powered_by.png")} />
            </View>
        </View>
    )
}