import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BASE_URL } from "../api/constants";

export function SelectField(props) {

    const [options, setOptions] = useState(["Java", "Kotlin", "Python"])

    const [selectValue, setSelectedValue] = useState(options[0])

    let data = props.data

    function onValueChanged(itemValue, index) {
        setSelectedValue(itemValue)
    }


    function fetchSelectFields() {
        const url = BASE_URL + "/v1/sdk/get-vehicle-make-model"
        const token = "MCAPUBK_TEST|84afcf91-1804-470b-be22-5ea194d9f083"

        const headers = { "Authorization": "Bearer " + token }


        console.log(url)
        useEffect(() => {
            fetch(url, { headers: headers, method: "GET" })
                .then((response) => response.json())`   `
                .then((json) => {
                    console.log(json)
                    if (json["responseCode"] == 1) {
                        if (typeof json["data"][0] == 'object') {
                            setOptions(json.data.map((element) => element["name"]))
                        } else {
                            setOptions(json["data"])
                        }
                    } else {
                        // print server message
                    }
                })
                .catch((error) => console.log(error))
        });
    }

    fetchSelectFields()

    return (
        <View>
            <Text style={{ marginVertical: 5 }}>{data["label"]}</Text>
            <View style={{ backgroundColor: "#EAECF0", borderRadius: 5 }}>
                <Picker
                    selectedValue={selectValue}
                    onValueChange={onValueChanged}>
                    {
                        options.map((item) => {
                            return <Picker.Item label={item} value={item} />
                        })
                    }
                </Picker>
            </View>

        </View>
    );
}