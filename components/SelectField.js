import {Picker} from '@react-native-picker/picker';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useApiKeyStore} from '../store/urlApiKeyStore';
import { colorBlack } from "../style/colors";

export function SelectField(props) {
  let {apiKey, baseUrl} = useApiKeyStore();
  const [options, setOptions] = useState(['Select an Option']);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const [selectValue, setSelectedValue] = useState(options[0]);

  let data = props.data;

  function onValueChanged(itemValue, index) {
    props.onChangeData(itemValue);
    setSelectedValue(itemValue);
  }

  function fetchSelectFields() {
    //  if (!hasFetchedData) {

    const url = baseUrl + '/v1' + data.data_url;
    const headers = {Authorization: 'Bearer ' + apiKey};

    useEffect(() => {
      fetch(url, {headers: headers, method: 'GET'})
        .then(response => response.json())
        .then(json => {
          if (json.responseCode === 1) {
            
            if (json.data[0].name) {
              setOptions(json.data.map(element => element.name));
              onValueChanged(json.data[0].name);
            } else {
              setOptions(json.data.map(element => element.toString()));
              onValueChanged(json.data[0].toString());
            }
            setHasFetchedData(true);
          }
        })
        .catch(error => console.log(error));
    }, []);
    //  }
  }

  fetchSelectFields();

  return (
    <View>
      <Text style={{marginVertical: 5, fontFamily: 'metropolis_regular',color: colorBlack}}>
        {data.label}
      </Text>
      <View style={{backgroundColor: '#EAECF0', borderRadius: 5}}>
        <Picker
          itemStyle={{
            fontSize: 20,
            fontFamily: 'metropolis_regular',
          }}
          mode="dropdown"
          selectedValue={selectValue}
          onValueChange={onValueChanged}>
          {options.map((item, index) => {
            return (
              <Picker.Item
                  key={index}
                color={colorBlack}
                fontFamily="metropolis_regular"
                label={item.charAt(0).toLocaleUpperCase() + item.substring(1)}
                value={item}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
}
