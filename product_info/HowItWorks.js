import { View, Image, useWindowDimensions, ScrollView } from "react-native";
import RenderHTML from "react-native-render-html";
import { styles } from "../style/styles";

export default function HowItWorks(props) {
    let data = props.data
    const { width } = useWindowDimensions()
    return (
        <View style={styles.htmlContainer}>
            <Image style={styles.infoImagesStyle} source={require("../assets/how_it_works.png")} />

            <ScrollView contentInsetAdjustmentBehavior="automatic" >
                <View style={styles.htmlContent}>
                    <RenderHTML contentWidth={width} source={{ html: data["how_it_works"] }} />
                </View>
            </ScrollView>
        </View>
    );
}