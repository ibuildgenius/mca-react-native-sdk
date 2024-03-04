import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from './product_list/ProductListComponent';
import ProductInfo from './product_info/ProductInfoComponent';
import ProductForm from './product_forms/ProductForms';
import PaymentOption from './payment_option/PaymentOption';
import SuccessScreen from './components/SuccessScreen';
import {useApiKeyStore} from './store/urlApiKeyStore';
import {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

export default function McaSDK(props) {
  let {setApiKey, setOnComplete} = useApiKeyStore();
  useEffect(() => {
    setApiKey(props.apiKey ?? 'MCAPUBK_TEST|44d8c41c-b436-40f6-bfc9-b0d52f0253bb');
    setOnComplete(props.onComplete ?? (() => console.log('Done')));
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{title: '', headerShown: false}}
          initialRouteName="ProductList">
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
          <Stack.Screen name="ProductForm" component={ProductForm} />
          <Stack.Screen name="PaymentOptionScreen" component={PaymentOption} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

 function Test() {
  return (
      <McaSDK apiKey="MCAPUBK_TEST|44d8c41c-b436-40f6-bfc9-b0d52f0253bb" />
  );
}

AppRegistry.registerComponent(appName, () => Test);

