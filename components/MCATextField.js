import {TextInput, View, Text, Platform,} from 'react-native';
import {SelectField} from './SelectField';
import {IOSSelectField } from './IosSelectField';
import { colorBlack, colorGreyOverlay, RED } from "../style/colors";

export function MCATextField(props) {
  let data = props.data;

  function onChange(textString) {
    props.onDataChange(textString);
  }

  if (data.form_field && data.form_field.name.toLowerCase() === 'select') {
    // return 
    if (Platform.OS === "ios") {
      return <IOSSelectField key={data.id} onChangeData={onChange} data={data} />;
    }
    else{
      return <SelectField key={data.id} onChangeData={onChange} data={data} />;
    }
  }

  return (
    <View style={{width: '100%', marginVertical: 6}}>
      <Text style={{marginVertical: 6, fontFamily: 'metropolis_regular',color: colorBlack, marginBottom:7}}>
        {data.label}
      </Text>
      <View style={{backgroundColor: '#EAECF0', borderRadius: 5}}>
        <TextInput
          key={data.id}
          onChangeText={onChange}
          // value={props.valueString}
          defaultValue={props.valueString}
          editable={props.editable}
          style={{
            padding: 6,
            fontFamily: 'metropolis_regular',
            color: colorBlack,
            minHeight:48,
          }}
          placeholderTextColor={colorGreyOverlay}
          placeholder={
            !props.editable && props.valueString
              ? props.valueString
              : data.description
          }
        />
      </View>
      {
        props.errorString?
        <Text style={{marginVertical: 6, fontFamily: 'metropolis_regular',color: RED, marginBottom:7, fontSize: 12,paddingTop:3}}>
        {props.errorString.replace(/_/g, ' ')}
      </Text>:
      <></>
      }
    </View>
  );
}
