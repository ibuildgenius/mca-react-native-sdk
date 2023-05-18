import { View, Text } from "react-native";

export default function PaymentOption({ navigation, route }) {
    let product = route.params.data
    return (
        <View>
            <Text>{product["name"]}</Text>
        </View>
    );
}