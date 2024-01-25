import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './product_list/ProductListComponent';
import ProductInfo from './product_info/ProductInfoComponent';
import ProductForm from './product_forms/ProductForms';
import PaymentOption from './payment_option/PaymentOption';
import SuccessScreen from './components/SuccessScreen';
import { useFonts } from "expo-font"
import { Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import { Raleway_400Regular, Raleway_500Medium, Raleway_700Bold } from "@expo-google-fonts/raleway";
import {TOKEN} from "./api/constants";
import {useApiKeyStore} from "./store/urlApiKeyStore";
import {useEffect} from "react";

export default function McaSDK(props) {

  let {setApiKey, setBaseUrl} = useApiKeyStore();
  useEffect(() => {
    setApiKey(props.apiKey ?? TOKEN);
    setBaseUrl();
  },[])

  const [loaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_700Bold
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

registerRootComponent(McaSDK);
