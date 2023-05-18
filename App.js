import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import ProductList from './product_list/ProductListComponent';
import ProductInfo from './product_info/ProductInfoComponent';
import ProductForm from './product_forms/ProductForms';
import PaymentOption from './payment_option/PaymentOption';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ title: "", headerShown: false }} initialRouteName='ProductList'>
        <Stack.Screen
          name='ProductList'
          component={ProductList}
        />
        <Stack.Screen
          name='ProductInfo'
          component={ProductInfo}
        />
        <Stack.Screen
          name='ProductForm'
          component={ProductForm}
        />
        <Stack.Screen
          name='PaymentOptionScreen'
          component={PaymentOption}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}