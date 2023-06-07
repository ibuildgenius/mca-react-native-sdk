import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './product_list/ProductListComponent';
import ProductInfo from './product_info/ProductInfoComponent';
import ProductForm from './product_forms/ProductForms';
import PaymentOption from './payment_option/PaymentOption';
import SuccessScreen from './components/SuccessScreen';
import { useFonts } from "expo-font"
import { Text, View } from 'react-native';

export default function McaSDK() {

  const [loaded] = useFonts({
    MetropolisRegular: require("./assets/fonts/metropolis_regular.otf"),
    MetropolisMedium: require("./assets/fonts/metropolis_medium.otf"),
    MetropolisBold: require("./assets/fonts/metropolis_bold.otf")
  })


  const Stack = createNativeStackNavigator();

  if (!loaded) {
    return <Text>Not Loaded</Text>;
  }

  return (<>
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
        <Stack.Screen
          name='SuccessScreen'
          component={SuccessScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
  );
}