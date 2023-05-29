import { View, Text, Button, FlatList, StyleSheet, Pressable } from "react-native"
import { styles } from "../style/styles"
import { useState, useEffect } from "react"
import { BASE_URL, TOKEN, initiatePurchase } from "../api/constants";
import ProductListItem from "./ProductListItem";
import { Colors } from "react-native/Libraries/NewAppScreen";

function ProductList({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState([])
    const [filterOption, setFilterOption] = useState("All")

    const url = BASE_URL + initiatePurchase

    const headers = { "Authorization": "Bearer " + TOKEN, "Content-Type": "application/json" }
    const jsonBody = JSON.stringify({
        action: "purchase",
        payment_option: "gateway"
    })

    useEffect(() => {
        fetch(url, { method: "POST", headers: headers, body: jsonBody })
            .then((response) => response.json())
            .then((json) => {
                global.instanceId = json["data"]["businessDetails"]["instance_id"];

                setProducts(json["data"]["productDetails"]);
                updateFilters(json["data"]["productDetails"])
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, []);


    function getProductList() {
        if (filterOption.toLowerCase() != "all") {
            return products.filter((item) =>
                item["prefix"] == filterOption
            )
        }
        return products
    }

    function updateFilters(p) {
        let x = new Set().add("All")
        p.forEach(
            (item) => {
                x.add(item["prefix"])
            }
        )
        setFilters([...x])
    }

    return (
        <View style={styles.appContainer}>
            <View style={styles.spacerHorizontal} ></View>
            <Text style={styles.titleText}>Product List</Text>
            {loading ? (<Text>Loading...</Text>) : (<View style={{ flex: 1, justifyContent: "flex-start" }}>
                {ProductFilterOptions(filters, filterOption, (option) => {
                    setFilterOption(option)
                })}
                <FlatList showsVerticalScrollIndicator={false} style={{ paddingBottom: 10 }} contentContainerStyle={{ justifyContent: "flex-start" }} data={getProductList()} renderItem={(itemData) => {
                    return <ProductListItem navigator={navigation} data={itemData.item} />
                }} keyExtractor={(item, index) => item.id} alwaysBounceVertical={false} />
            </View>
            )
            }

        </View>
    )
}

export default ProductList

function ProductFilterOptions(options, filterOption, onItemPressed) {

    const style = StyleSheet.create({
        inactiveContainer: {
            backgroundColor: 'white',
            marginHorizontal: 5,
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 30,
            borderWidth: 1.5,
            borderColor: "#3BAA90",
            justifyContent: "center"
        },

        activeContainer: {
            backgroundColor: '#3BAA90',
            marginHorizontal: 5,
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#3BAA90",
            justifyContent: "center"
        },

        inactiveText: {
            textAlign: "center",
            color: "#3BAA90"
        },

        activeText: {
            textAlign: "center",
            color: "white"
        }


    });

    return (
        <FlatList showsHorizontalScrollIndicator={false} horizontal={true} style={{ maxHeight: 40, marginVertical: 8 }} data={options} renderItem={(itemData) => {

            let option = itemData.item
            function x() {
                onItemPressed(option)
            }

            return (
                <Pressable onPress={x}>
                    <View style={option == filterOption ? style.activeContainer : style.inactiveContainer}>
                        <Text style={option == filterOption ? style.activeText : style.inactiveText} >{option}</Text>
                    </View>
                </Pressable>
            );
        }} />
    );
}