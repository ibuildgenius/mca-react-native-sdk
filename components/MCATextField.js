import { useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";
import { SelectField } from "./SelectField";

export function MCATextField(props) {
    let data = props.data

    function onChange(textString) {
        props.onDataChange(textString)
    }

    console.log(props.valueString)

    if (data["form_field"].name.toLowerCase() === "select") {
        return <SelectField key={data["id"]} onChangeData={onChange} data={data} />
    }

    return (
        <View key={props.key} style={{ width: "100%", marginVertical: 6 }}>
            <Text style={{ marginVertical: 6, fontFamily: "MetropolisRegular" }}>{data["label"]}</Text>
            <View style={{ backgroundColor: "#EAECF0", borderRadius: 5 }}>
                <TextInput onChangeText={onChange} value={props.valueString} editable={props.editable} style={{ padding: 6, fontFamily: "MetropolisRegular" }} placeholder={(!props.editable && (props.valueString)) ? props.valueString : data["description"]} />
            </View>
        </View>
    );
}