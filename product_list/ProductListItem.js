import {View, Text, Pressable, Image, Alert} from 'react-native';
import {styles} from '../style/styles';
import {getImage} from '../product_forms/ProductForms';
import Health from '../assets/health.svg';
import Gadget from '../assets/gadget.svg';
import Home from '../assets/home.svg';
import Hospital from '../assets/hospital.svg';
import Office from '../assets/office.svg';
import { colorBlack, colorNavy } from '../style/colors';
import {currencify} from '../api/constants';

export default function ProductListItem(props) {
  const data = props.data;

  function failedDialog(message) {
    Alert.alert("Operation Failed", message);
  }

  function resolveImage() {
    let name = data.name.toLowerCase();

    let size = '35';

    if (name.includes('home')) {
      
      return <Home width={size} height={size} />;
    } else if (name.includes('gadget')) {
      return <Gadget width={size} height={size} />;
    } else if (name.includes('office')) {
      return <Office width={size} height={size} />;
    } else if (name.includes('health') || name.includes('hospital')) {
      return <Hospital width={size} height={size} />;
    } else {
      return <Health width={size} height={size} />;
    }
  }

  function navigate() {
    if ( data["form_fields"]){
      props.navigator.navigate('ProductInfo', {productData: data});
    }else{
      failedDialog("Product is unavailable at the moment, Please try again");
    }
  }

  function getIcon() {
    return getImage(data.prefix, false);
  }

  let price = parseFloat(data.price);
  return (
    <Pressable
      onPress={navigate}
      style={({pressed}) => pressed && {opacity: 0.7}}>
      <View style={styles.listItem}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {resolveImage()}
        </View>
        <View style={{flex: 5, marginHorizontal: 8}}>
          <Text
            style={{
              marginBottom: 8,
              fontFamily: 'metropolis_medium',
              fontWeight: '700',
              fontSize:14,
              color: colorNavy,
            }}>
            {data.name}
          </Text>

          <View
            style={{flexDirection: 'row', marginTop: 2, alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'metropolis_regular',
                color: '#667085',
                marginRight: 5,
              }}>
              {data.prefix}
            </Text>
            {getIcon()}
          </View>
        </View>
        <View
          style={{flex: 2, flexDirection: 'row-reverse', alignItems: 'center'}}>
          {data.is_dynamic_pricing ? (
            <Text style={{fontFamily: 'metropolis_regular', color: colorBlack}}>{price}%</Text>
          ) : (
            <Text style={{fontFamily: 'metropolis_regular', color: colorBlack}}>₦{currencify(price)}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
