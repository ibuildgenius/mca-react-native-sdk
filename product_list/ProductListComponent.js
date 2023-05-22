import { View, Text, Button, FlatList } from "react-native"
import { styles } from "../style/styles"
import { useState, useEffect } from "react"
import { BASE_URL, initiatePurchase } from "../api/constants";
import ProductListItem from "./ProductListItem";

function ProductList({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const [products, setProducts] = useState([])

    const url = BASE_URL + initiatePurchase

    const token = "MCAPUBK_TEST|84afcf91-1804-470b-be22-5ea194d9f083"

    const headers = { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
    const jsonBody = JSON.stringify({
        action: "purchase",
        payment_option: "gateway"
    })

    useEffect(() => {
        fetch(url, { method: "POST", headers: headers, body: jsonBody })
            .then((response) => response.json())
            .then((json) => {
                global.instanceId = json["data"]["businessDetails"]["instance_id"];
                setData(json);
                setProducts(json["data"]["productDetails"]);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, []);




    return (
        <View style={styles.appContainer}>
            <View style={styles.spacerHorizontal} ></View>
            <Text style={styles.titleText}>Product List</Text>
            {loading ? (<Text>Loading...</Text>) : (<>
                <FlatList style={{ marginBottom: 12 }} data={products} renderItem={(itemData) => {
                    return <ProductListItem navigator={navigation} data={itemData.item} />
                }} keyExtractor={(item, index) => item.id} alwaysBounceVertical={false} />
            </>
            )
            }

        </View>
    )
}

export default ProductList