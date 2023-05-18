import { useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";

export function MCATextField(props) {
    let data = props.data

    function onChange(textString) {
        props.onDataChange(textString)
    }

    return (
        <View key={props.key} style={{ width: "100%", marginVertical: 6 }}>
            <Text style={{ marginVertical: 6 }}>{data["label"]}</Text>
            <View style={{ backgroundColor: "#EAECF0", borderRadius: 5 }}>
                <TextInput onChangeText={onChange} value={props.valueString} editable={props.editable} style={{ padding: 6 }} placeholder={data["description"]} />
            </View>
        </View>
    );
}