import {Button, View, Text} from 'react-native';
import MCALayout from './MCALayout';
import { colorBlack, colorPrimary } from "../style/colors";

export default function SuccessScreen(props) {
  var message = props.message || 'Lorem Ipsum';

  function onDone() {
    props.onDonePressed();
  }

  return (
    <MCALayout>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'metropolis_medium',
            fontSize: 18,
            textAlign: 'center',
            color: colorBlack,
          }}>
          {message}
        </Text>
      </View>
      <Button title="Done" color={colorPrimary} onPress={onDone} />
    </MCALayout>
  );
}
