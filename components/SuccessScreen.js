import { Button, View } from "react-native";
import MCALayout from "./MCALayout";

export default function SuccessScreen({ navigator, route }) {
    var data = route.params.data

    function onDone() {
        navigator.navigate("ProductList")
    }

    return (
        <MCALayout>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontFamily: "MetropolisBold", fontSize: 18 }}>
                    Your purchase for {data["name"]} was successful
                </Text>

                <Button title="Done" onPress={onDone} />
            </View>
        </MCALayout>
    );
}