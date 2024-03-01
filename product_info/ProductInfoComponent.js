import {useWindowDimensions, Button, View, Text} from 'react-native';

import MCALayout from '../components/MCALayout';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import HowToClaim from './HowToClaim';
import {useState} from 'react';
import {colorPrimary} from '../style/colors';

function ProductInfo({navigation, route}) {
  let productData = route.params.productData;

  const howItWorks = () => <HowItWorks data={productData} />;

  const benefits = () => <Benefits data={productData} />;

  const howToClaim = () => <HowToClaim data={productData} />;

  let renderScene = SceneMap({
    howItWorks: howItWorks,
    benefits: benefits,
    howToClaim: howToClaim,
  });

  let layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'howItWorks', title: 'How It Works'},
    {key: 'benefits', title: 'Benefits'},
    {key: 'howToClaim', title: 'How To Claim'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#F2F4F7'}}
      activeColor="#3BAA90"
      inactiveColor="#364657"
      labelStyle={{
        textTransform: 'none',
        fontFamily: 'metropolis_medium',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
      }}
      style={{backgroundColor: '#F2F4F7', elevation: 0}}
    />
  );

  function nextScreen() {
    navigation.navigate('ProductForm', {data: productData});
  }
  function onBackPressed() {
    navigation.goBack();
  }

  return (
    <MCALayout onBackPressed={onBackPressed}>
      <TabView
        style={{flex: 1}}
        swipeEnabled={false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
      <Button title="Continue" color={colorPrimary} onPress={nextScreen} />
    </MCALayout>
  );
}

export default ProductInfo;
