import { View, Image, useWindowDimensions, ScrollView } from "react-native";
import RenderHTML from "react-native-render-html";
import { styles } from "../style/styles";



export default function Benefits(props) {
    let data = props.data

    const { width } = useWindowDimensions()

    return (
        <View style={styles.htmlContainer}>
            <Image style={styles.infoImagesStyle} source={require("../assets/benefits.png")} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="always">
                <View style={styles.htmlContent}>
                    <RenderHTML contentWidth={width} source={{ html: data["key_benefits"] }} />
                </View>
            </ScrollView>
        </View>
    );
}