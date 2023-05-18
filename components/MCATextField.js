import { useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";

export default function MCATextField(props) {
    let data = props.data

    return (
        <View style={{ width: "100%", marginVertical: 6 }}>
            <Text style={{ marginVertical: 6 }}>{data["label"]}</Text>
            <View style={{ backgroundColor: "#EAECF0", borderRadius: 5 }}>
                <TextInput editable={props.editable} style={{ padding: 6 }} placeholder={data["description"]} />
            </View>
        </View>
    );
}

export function MDatePicker(props) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const productData = props.data

    function openPicker() {
        setOpen(true)
    }

    function closePicker() {
        setOpen(false)
    }

    return (
        <>
            <Pressable onPress={openPicker}>
                <MCATextField data={productData} editable={false} />
            </Pressable>
        </>
    );
}