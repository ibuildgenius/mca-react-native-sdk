import { View, Text } from "react-native"

import { styles } from "../style/styles"
import MCALayout from "../components/MCALayout"

function ProductInfo({ navigation, route }) {

    let productData = route.params.productData

    return (
        <View style={styles.appContainer}>
            <View style={styles.spacerHorizontal}></View>
            <MCALayout>
                <Text>Hello, This is the {productData["name"]} screen</Text>
            </MCALayout>
        </View>
    )
}

export default ProductInfo

