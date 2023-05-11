import { View, Text } from "react-native"

function ProductInfo ({navigation, route}) {
    return (
    <View>
        <Text>Hello, This is the {route.params.name} screen</Text>
    </View>
    )
}

export default ProductInfo