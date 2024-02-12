import {
  Button,
  Modal,
  Pressable,
  View,
  Text,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import {MCATextField} from './MCATextField';
import {useState} from 'react';
import {styles} from '../style/styles';
import {colorPrimary} from '../style/colors';

export default function ItemPair(props) {
  let data = props.data;

  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  function disPlayModal() {
    setShowModal(true);
  }

  function update() {
    var newAmount = parseInt(amount);

    if (name.trim() == '') {
      Alert.alert('Error', 'name cannot be empty');
      return;
    }

    if (isNaN(newAmount)) {
      Alert.alert('Error', 'amount must be a number');
      return;
    }

    let item = {name: name, amount: newAmount, id: entries.length + 1};
    setEntries(currentEntries => [...currentEntries, item]);
    setName('');
    setAmount('');
    dismiss();
  }

  function dismiss() {
    props.onUpdate(entries);
    setShowModal(false);
  }

  function updateName(text) {
    setName(text);
  }
  function updateAmount(text) {
    setAmount(text);
  }

  return (
    <View>
      <Pressable onPress={disPlayModal}>
        <MCATextField
          editable={false}
          data={data}
          valueString={
            entries.length > 0 ? ' ' + entries.length + ' item(s)' : ''
          }
        />
      </Pressable>
      <Modal visible={showModal}>
        <View style={styles.appContainer}>
          <Text
            style={{
              marginVertical: 15,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'metropolis_medium',
            }}>
            Item Info
          </Text>
          <MCATextField
            onDataChange={updateName}
            data={{
              label: 'Name',
              description: 'Item name',
              form_field: {name: 'none'},
            }}
          />
          <MCATextField
            onDataChange={updateAmount}
            data={{
              label: 'Amount',
              description: 'Item Amount',
              form_field: {name: 'none'},
            }}
          />
          <View
            style={{
              marginHorizontal: '10%',
              marginVertical: 20,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, marginHorizontal: 10}}>
              <Button title="Add" color={colorPrimary} onPress={update} />
            </View>
            <View style={{flex: 1, marginHorizontal: 10}}>
              <Button title="Cancel" color="red" onPress={dismiss} />
            </View>
          </View>

          {entries.length > 0 ? (
            <View style={{flex: 1}}>
              <Text
                style={{marginVertical: 12, fontFamily: 'metropolis_medium'}}>
                {' '}
                Items
              </Text>
              <FlatList
                data={entries}
                renderItem={itemData => {
                  let item = itemData.item;

                  function deleteItem() {
                    setEntries(currentEntries => {
                      return currentEntries.filter(
                        entry => entry.id !== item.id,
                      );
                    });
                  }

                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 6,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        backgroundColor: '#F4F3FF',
                        marginVertical: 2,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'metropolis_regular',
                            color: '#667085',
                            fontSize: 12,
                            marginBottom: 5,
                          }}>
                          Name
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'metropolis_regular',
                            fontSize: 16,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{flex: 1}} />
                      <View>
                        <Text
                          style={{
                            fontFamily: 'metropolis_regular',
                            color: '#667085',
                            fontSize: 12,
                            marginBottom: 5,
                          }}>
                          Amount
                        </Text>
                        <Text style={{fontFamily: 'metropolis_regular'}}>
                          N {item.amount}
                        </Text>
                      </View>

                      <View style={{flex: 1}} />
                      <Pressable onPress={deleteItem} style={{padding: 6}}>
                        <Image
                          resizeMode="center"
                          source={require('../assets/delete.png')}
                          style={{width: 25, height: 25}}
                        />
                      </Pressable>
                    </View>
                  );
                }}
              />
            </View>
          ) : (
            <View />
          )}
        </View>
      </Modal>
    </View>
  );
}
