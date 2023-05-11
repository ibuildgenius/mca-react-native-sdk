import { View, Text, Pressable } from "react-native"
import { styles } from "../style/styles";

export default function ProductListItem(props) {
    const data = props.data

    return (
        <View style={styles.listItem}>
            <View></View>
            <View>
                <Text>{data["name"]}</Text>
                <Text>{data["price"]}</Text>
            </View>
            <View></View>
        </View>
    );
}