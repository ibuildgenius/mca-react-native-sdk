import {View, Text, Image, Pressable, SafeAreaView} from 'react-native';
import {styles} from '../style/styles';
import {colorPrimary} from '../style/colors';
import BackButton from '../assets/back.svg';

export default function MCALayout(props) {
  return (
    <SafeAreaView style={{ flex: 1,}}>
    <View style={styles.appContainer}>
      <View style={styles.spacerHorizontal} />
      {!props.onBackPressed ? (
        <></>
      ) : (
        <View style={{ position: 'relative', alignItems: 'center', paddingBottom: 5 }}>
          <Pressable style={{ position: 'absolute', left: 0, top: 0, padding: 12 }} onPress={props.onBackPressed}>
            <BackButton width={30} height={30} />
          </Pressable>

          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
      )}

      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1, width: '100%'}}>{props.children}</View>
        <Image
          style={styles.poweredBy}
          source={require('../assets/powered_by.png')}
        />
      </View>
    </View>
    </SafeAreaView>
  );
}
