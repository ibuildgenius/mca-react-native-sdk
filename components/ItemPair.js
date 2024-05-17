import {
  Button,
  Modal,
  Pressable,
  View,
  Text,
  Alert,
  Image,
  FlatList,
} from "react-native";
import { MCAItemPairField } from "./MCAItemPairField";
import { MCATextField } from "./MCATextField";
import { useState, useEffect } from "react";
import { styles } from "../style/styles";
import { colorPrimary } from "../style/colors";

export default function ItemPair(props) {
  let data = props.data;

  const [pairData, setPairData] = useState({});

  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (entries.length > 0) {
      props.onUpdate(entries);
    }
  }, [entries]);

  function disPlayModal() {
    setShowModal(true);
  }

  function removeCommaIfSeparated(input) {
    // Check if the input is a string and contains a comma
    if (typeof input === "string" && input.includes(",")) {
      // Remove the comma and return the modified string
      return input.replace(/,/g, "");
    } else {
      // Return the input as is if it's not comma-separated
      return input;
    }
  }

  function formatInput(input) {
    if (typeof input === "number" && !isNaN(input)) {
      // Convert the integer to a string
      const inputString = input.toString();
      // Add commas for thousands
      const formatted = inputString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formatted;
    } else {
      return input;
    }
  }

  function update() {
    let item = pairData;
    setEntries((currentEntries) => [...currentEntries, item]);
    dismiss();
    setName("");
    setAmount("");
  }

  function dismiss() {
    props.onUpdate(entries);
    setShowModal(false);
  }

  function updateData(
    key,
    value,
    validate = false,
    minMaxConstraint,
    min,
    isDate = false
  ) {
    // if (validate) {
    //   if (isDate) {
    //     validateDate(key, value, minMaxConstraint, min);
    //   } else {
    //     validateData(key, value, minMaxConstraint, min);
    //   }
    // }
    let newMap = pairData;
    newMap[key] = value;
    setPairData(newMap);
  }

  return (
    <View>
      <Pressable onPress={disPlayModal}>
        <MCAItemPairField
          editable={false}
          data={data}
          valueString={
            entries.length > 0 ? " " + entries.length + " item(s)" : ""
          }
        />
      </Pressable>
      <Modal visible={showModal}>
        <View style={styles.appContainer}>
          <Text
            style={{
              marginVertical: 15,
              fontSize: 16,
              textAlign: "center",
              fontFamily: "metropolis_medium",
            }}
          >
            Item Info
          </Text>
          {data.child_data.map((element, index) => {
            let fieldType = element["input_type"];
            let dataType = element["data_type"].toLowerCase();

            function onDataChange(value) {
              if (dataType == "array") {
                updateData(element["name"], value);
              } else if (dataType == "number") {
                updateData(
                  element["name"],
                  parseInt(removeCommaIfSeparated(value)),
                  true,
                  element["min_max_constraint"],
                  element["min"]
                );
              } else if (dataType == "boolean") {
                updateData(
                  element["name"],
                  value.toLowerCase() == "true" ? true : false
                );
              } else {
                if (element["input_type"].toLowerCase() == "date") {
                  updateData(
                    element["name"],
                    value,
                    true,
                    element["min_max_constraint"],
                    element["min"],
                    true
                  );
                } else {
                  updateData(
                    element["name"],
                    value,
                    true,
                    element["min_max_constraint"],
                    element["min"]
                  );
                }
              }
            }

            return <MCATextField onDataChange={onDataChange} data={element} />;
          })}
          <View
            style={{
              marginHorizontal: "10%",
              marginVertical: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Button title="Add" color={colorPrimary} onPress={update} />
            </View>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Button title="Cancel" color="red" onPress={dismiss} />
            </View>
          </View>

          {entries.length > 0 ? (
            <View style={{ flex: 1 }}>
              <Text
                style={{ marginVertical: 12, fontFamily: "metropolis_medium" }}
              >
                {" "}
                Items
              </Text>
              <FlatList
                data={entries}
                renderItem={({ item }) => {
                  function deleteItem() {
                    setEntries((currentEntries) => {
                      return currentEntries.filter(
                        (entry) => entry.id !== item.id
                      );
                    });
                  }

                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 6,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        backgroundColor: "#F4F3FF",
                        marginVertical: 2,
                      }}
                    >
                      {Object.entries(item).map(([key, value]) => (
                        <View key={key} style={{ marginRight: 10 }}>
                          <Text
                            style={{
                              fontFamily: "metropolis_regular",
                              color: "#667085",
                              fontSize: 12,
                              marginBottom: 5,
                            }}
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Text>
                          <Text style={{ fontFamily: "metropolis_regular" }}>
                            {/* {key.toLowerCase.c === 'amount' ? `N ${value}` : value}
                             */}
                            {key.toLowerCase().includes("amount") ||
                            key.toLowerCase().includes("value")
                              ? `N ${value}`
                              : value}
                          </Text>
                        </View>
                      ))}

                      <View style={{ flex: 1 }} />
                      <Pressable onPress={deleteItem} style={{ padding: 6 }}>
                        <Image
                          resizeMode="center"
                          source={require("../assets/delete.png")}
                          style={{ width: 25, height: 25 }}
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
