import { View, Text, Button, FlatList, StyleSheet, Pressable, ActivityIndicator, TextInput } from "react-native"
import { styles } from "../style/styles"
import { useState, useEffect } from "react"
import { initiatePurchase } from "../api/constants";
import ProductListItem from "./ProductListItem";
import SearchIcon from "../assets/search.svg";
import {useApiKeyStore} from "../store/urlApiKeyStore";

export default function ProductList({ navigation }) {

    let {apiKey,baseUrl} = useApiKeyStore();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState([])
    const [filterOption, setFilterOption] = useState("All")

    const url = baseUrl + initiatePurchase

    const headers = { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" }
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
        var p = products

        if (filterOption.toLowerCase() != "all") {
            p = products.filter((item) =>
                item["prefix"] == filterOption
            )
        }
        return p.sort((a, b) => { return a.name.localeCompare(b.name) })
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
            {loading ?
                (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <ActivityIndicator style={{ margin: 12, color: "#3BAA90" }} animating={loading} />
                        <Text style={{ fontFamily: "Raleway_500Medium" }}>Fetching Products...</Text>
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: "flex-start" }}>
                        <Text style={styles.titleText}>Product Page</Text>


                        <View style={{ flexDirection: "row", marginVertical: 4, borderWidth: 0.5, borderRadius: 25, borderColor: "#D0D5DD", alignItems: "center", paddingVertical: 6, paddingHorizontal: 12 }}>
                            <SearchIcon />
                            <TextInput style={{ marginLeft: 8, fontFamily: "Raleway_400Regular", flex: 1 }} placeholderTextColor={"#98A2B3"} placeholder="Search Products" />
                        </View>


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


function ProductFilterOptions(options, filterOption, onItemPressed) {

    const style = StyleSheet.create({
        inactiveContainer: {
            backgroundColor: 'white',
            marginHorizontal: 5,
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 30,
            borderWidth: 0.8,
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
            color: "#3BAA90",
            fontFamily: "Raleway_400Regular",
            fontSize: 14,
            fontWeight: "400"
        },

        activeText: {
            textAlign: "center",
            color: "white",
            fontFamily: "Raleway_400Regular",
            fontSize: 14,
            fontWeight: "400"
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
