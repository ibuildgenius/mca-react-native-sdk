import { View, Text, useWindowDimensions, Button } from "react-native"

import { styles } from "../style/styles"
import MCALayout from "../components/MCALayout"
import { SceneMap, TabView, TabBar } from "react-native-tab-view"
import HowItWorks from "./HowItWorks"
import Benefits from "./Benefits"
import HowToClaim from "./HowToClaim"
import { useState } from "react"
import { colorPrimary } from "../style/colors"

function ProductInfo({ navigation, route }) {

    let productData = route.params.productData


    const howItWorks = () => (
        <HowItWorks data={productData} />
    )

    const benefits = () => (
        <Benefits data={productData} />
    )

    const howToClaim = () => (
        <HowToClaim data={productData} />
    )


    let renderScene = SceneMap({
        howItWorks: howItWorks,
        benefits: benefits,
        howToClaim: howToClaim
    })

    let layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "howItWorks", title: "How It Works" },
        { key: "benefits", title: "Benefits" },
        { key: "howToClaim", title: "How To Claim" }])

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#F2F4F7' }}
            activeColor="#3BAA90"
            inactiveColor="#364657"
            labelStyle={{ textTransform: "none" }}
            style={{ backgroundColor: '#F2F4F7', elevation: 0 }}
        />
    );


    function nextScreen() {
        navigation.navigate("ProductForm", { data: productData })
    }

    return (

        <MCALayout>
            <TabView
                swipeEnabled={false}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
            <Button title="Continue" color={colorPrimary} onPress={nextScreen} />
        </MCALayout>
    )
}

export default ProductInfo

