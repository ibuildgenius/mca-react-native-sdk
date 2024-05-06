import {View, Text, Image, Pressable, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {styles} from '../style/styles';
import {colorPrimary} from '../style/colors';
import BackButton from '../assets/back.svg';
import { useApiKeyStore } from "../store/urlApiKeyStore";

export default function MCALayout(props) {
  let { onClose, resetToDefault} = useApiKeyStore();

  function closeSdk() {
    console.log("This is closed");
    resetToDefault();
    global.instanceId = undefined;
    onClose();
  }

  function showCloseDialog() {
    Alert.alert(
      "Quit Process",
      "You are about to quit this process, do you want to proceed with this action?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("OK Pressed"),
          style: "cancel",
        },
        {
          text: "OK",

          onPress: () => {
            closeSdk();
          },
        },
      ],
      { cancelable: false }
    );
  }

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
          
          <TouchableOpacity
                onPress={showCloseDialog}
                style={{ position: 'absolute', right: 0, top: 0, padding: 12 }}
                // style={styles.closeButtonContainer}
              >
                <View
                  style={[
                    styles.closeButton,
                    { backgroundColor: "rgba(139, 0, 0, 0.25)", opacity: 1 },
                  ]}
                >
                  <Text
                    style={{
                      color: "red",
                      opacity: 0.6,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    X
                  </Text>
                  {/* <Icon name="close" color={RED} size={15} /> */}
                </View>
              </TouchableOpacity>

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
