import { TextInput, View, Text, Platform } from "react-native";
import { SelectField } from "./SelectField";
import { IOSSelectField } from "./IosSelectField";
import { colorBlack, colorGreyOverlay, RED } from "../style/colors";

export function MCAImageTextField(props) {
  let data = props.data;

  function onChange(textString) {
    props.onDataChange(textString);
  }

  if (data.form_field && data.form_field.name.toLowerCase() === "select") {
    // return
    if (Platform.OS === "ios") {
      return (
        <IOSSelectField key={data.id} onChangeData={onChange} data={data} />
      );
    } else {
      return <SelectField key={data.id} onChangeData={onChange} data={data} />;
    }
  }

  return (
    <View style={{ width: "100%", marginVertical: 6 }}>
      <Text
        style={{
          marginVertical: 6,
          fontFamily: "metropolis_regular",
          color: colorBlack,
          marginBottom: 7,
        }}
      >
        {data.label}
      </Text>
      <View
        style={{
          backgroundColor: "#EAECF0",
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "blue",
            borderRadius: 4,
            padding: 4,
            marginLeft: 8,
            paddingHorizontal: 10,
            opacity: 0.7,
          }}
        >
          <Text style={{ color: "blue" }}>Select Image</Text>
        </View>

        <Text
          style={{
            padding: 6,
            paddingTop: 15,
            fontFamily: "metropolis_regular",
            color: "#888888",
            minHeight: 48,
            flex: 1,
          }}
        >
          {!props.editable && props.valueString
            ? props.valueString
            : data.description}
        </Text>
      </View>
      {props.errorString ? (
        <Text
          style={{
            marginVertical: 6,
            fontFamily: "metropolis_regular",
            color: RED,
            marginBottom: 7,
            fontSize: 12,
            paddingTop: 3,
          }}
        >
          {props.errorString.replace(/_/g, " ")}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
}
