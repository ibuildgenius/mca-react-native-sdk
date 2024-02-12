import React, {useEffect} from 'react';
import {useApiKeyStore} from './store/urlApiKeyStore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ProductList from './product_list/ProductListComponent';
import ProductInfo from './product_info/ProductInfoComponent';
import ProductForm from './product_forms/ProductForms';
import PaymentOption from './payment_option/PaymentOption';
import SuccessScreen from './components/SuccessScreen';

function App(): React.JSX.Element {
  let {setApiKey} = useApiKeyStore();
  useEffect(() => {
    setApiKey('MCAPUBK_TEST|44d8c41c-b436-40f6-bfc9-b0d52f0253bb');
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

export default App;
