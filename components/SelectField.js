import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BASE_URL, TOKEN } from "../api/constants";

export function SelectField(props) {

    const [options, setOptions] = useState(["Select an Option"])

    const [selectValue, setSelectedValue] = useState(options[0])

    let data = props.data

    function onValueChanged(itemValue, index) {
        props.onChangeData(itemValue)
        setSelectedValue(itemValue)
    }


    function fetchSelectFields() {
        const url = BASE_URL + "/v1" + data["data_url"]

        const headers = { "Authorization": "Bearer " + TOKEN }

        useEffect(() => {
            fetch(url, { headers: headers, method: "GET" })
                .then((response) => response.json())
                .then((json) => {
                    if (json["responseCode"] == 1) {
                        if (json["data"][0]["name"]) {
                            setOptions(json.data.map((element) => element["name"]))
                        } else {
                            setOptions(json.data.map((element) => element.toString()))
                        }
                    }
                })
                .catch((error) => console.log(error))
        });
    }

    fetchSelectFields()

    return (
        <View>
            <Text style={{ marginVertical: 5, fontFamily: "MetropolisRegular" }}>{data["label"]}</Text>
            <View style={{ backgroundColor: "#EAECF0", borderRadius: 5 }}>
                <Picker
                    itemStyle={{ fontSize: 20, fontFamily: "MetropolisRegular" }}
                    mode="dropdown"
                    selectedValue={selectValue}
                    onValueChange={onValueChanged}>
                    {
                        options.map((item) => {
                            return <Picker.Item fontFamily="MetropolisRegular" label={item.charAt(0).toLocaleUpperCase() + item.substring(1)} value={item} />
                        })
                    }
                </Picker>
            </View>

        </View>
    );
}