import { Text } from "react-native";
import MCALayout from "../components/MCALayout";

export default function ProductForm({ navigation, route }) {

    let productData = route.params.data
    return (
        <MCALayout>
            <Text>{productData["name"]}</Text>
        </MCALayout>
    );
}