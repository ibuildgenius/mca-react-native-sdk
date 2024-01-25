import { useState } from "react"
import { View, Pressable } from "react-native"
import { MCATextField } from "./MCATextField"
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";


export function MDatePicker(props) {
    const productData = props.data

    const [showPicker, setShowPicker] = useState(false)
    const [date, setDate] = useState(new Date())

    function openPicker() {
        setShowPicker(true)
    }

    function onPickerChanged(event, date) {
        closePicker()
        setDate(date)
        props.dateValueChanged(isoDate)
    }

    function renderPicker() {
        if (showPicker) {
            return <RNDateTimePicker onChange={onPickerChanged} value={date} mode="date" />
        }
    }

    function closePicker() {
        setShowPicker(false)
    }

    let displayDate = date.toDateString()
    let isoDate = date.toISOString()


    return (
        <>
            <Pressable key={props.keyValue} onPress={openPicker}>
                <MCATextField valueString={displayDate} data={productData} editable={false} />
            </Pressable>
            {renderPicker()}

        </>

    );
}
