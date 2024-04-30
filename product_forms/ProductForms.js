import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  BackHandler,
} from "react-native";
import MCALayout from "../components/MCALayout";
import { colorBlack, colorGreyOverlay, colorPrimary } from "../style/colors";
import { useState, useEffect } from "react";
import { MCATextField } from "../components/MCATextField";
import { MDatePicker } from "../components/MDatePicker";
import FilePicker from "../components/FilePicker";
import ItemPair from "../components/ItemPair";
import SuccessScreen from "../components/SuccessScreen";
import { useApiKeyStore } from "../store/urlApiKeyStore";
import { usePaymentStore } from "../store/paymentStore";

import InfoIcon from "../assets/info.svg";

export default function ProductForm({ navigation, route }) {
  const screenHeight = Dimensions.get("window").height;
  let {
    apiKey,
    baseUrl,
    onComplete,
    paymentOption,
    debitWalletReference,
    form,
  } = useApiKeyStore();
  let { hasPaid, formError, setFormError } = usePaymentStore();
  let { setHasPaid } = usePaymentStore();

  let productData = route.params.data;

  let transactionRef = route.params.transactionRef || "";
  //let existingFormData = route.params.formData

  let [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(form || {});
  const [purchaseDetails, setPurchaseDetails] = useState({});
  // const [formError, setFormError] = useState({});
  const [fieldIndex, setFieldIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [newTransactionRef, setNewTransactionRef] = useState(
    transactionRef ?? ""
  );

  function failedDialog(message) {
    Alert.alert("Transaction Failed", message);
  }

  function removeCommaIfSeparated(input) {
    // Check if the input is a string and contains a comma
    if (typeof input === 'string' && input.includes(',')) {
      // Remove the comma and return the modified string
      return input.replace(/,/g, '');
    } else {
      // Return the input as is if it's not comma-separated
      return input;
    }
  }

  function formatInput (input) {
    if (typeof input === 'number' && !isNaN(input)) {
      // Convert the integer to a string
      const inputString = input.toString();
      // Add commas for thousands
      const formatted = inputString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formatted;
    } else {
      return input;
    }
  };

  useEffect(() => {
    const handleBackButton = () => {
      if (fieldIndex > 0) {
        setFieldIndex(fieldIndex - 1);

        return true;
      } else {
        return hasPaid;
      }
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, [fieldIndex, hasPaid, newTransactionRef]); // Empty dependency array means this effect only runs once after mounting

  let formFields = productData["form_fields"]
    .filter((item) => {
      return newTransactionRef.trim().length > 1 ||
        transactionRef.trim().length > 1
        ? !item["show_first"]
        : item["show_first"];
    })
    .sort((a, b) => a.position - b.position);

  let totalFields = productData["form_fields"].filter((item) => {
    return newTransactionRef.trim().length > 1 ||
      transactionRef.trim().length > 1
      ? !item["show_first"].length
      : item["show_first"].length;
  }).length;

  function updateData(
    key,
    value,
    validate = false,
    minMaxConstraint,
    min,
    isDate = false
  ) {
    if (validate) {
      if (isDate) {
        validateDate(key, value, minMaxConstraint, min);
      } else {
        validateData(key, value, minMaxConstraint, min);
      }
    }
    let newMap = formData;
    newMap[key] = value;
    setFormData(newMap);
  }

  function validateData(formName, formValue, minMaxConstraint, min) {
    if (minMaxConstraint == "value") {
      if (formValue < min) {
        let newMap = formError;
        newMap[formName] = `${formName} cannot be less than ${min}`;
        setFormError(newMap);
      } else {
        const newMap = { ...formError };
        delete newMap[formName];
        setFormError(newMap);
      }
    } else if (minMaxConstraint == "length") {
      if (formValue.length < min) {
        let newMap = formError;
        newMap[formName] = `${formName} should not be less than ${min}`;
        setFormError(newMap);
      } else {
        const newMap = { ...formError };
        delete newMap[formName];
        setFormError(newMap);
      }
    }
  }

  function validateDate(formName, formValue, minMaxConstraint, min) {
    if (minMaxConstraint == "value") {
      const yearComparison = compareDateWithToday(formValue);
      if (yearComparison < min) {
        let newMap = formError;
        newMap[formName] = `${formName} requires a minimum of ${min} years`;
        setFormError(newMap);
      } else {
        const newMap = { ...formError };
        delete newMap[formName];
        setFormError(newMap);
      }
    }
  }

  function compareDateWithToday(dateString) {
    const providedDate = new Date(dateString);

    // Get today's date
    const today = new Date();

    // Extract the year from each date
    const providedYear = providedDate.getFullYear();
    const currentYear = today.getFullYear();

    // Compare the years and get the result
    const yearComparison = currentYear - providedYear;
    return yearComparison;
  }

  function initiateWalletPurchase(product, formData) {
    formData.product_id = product.id;

    let payload = {
      instance_id: global.instanceId,
      reference: debitWalletReference,
      payload: formData,
    };

    setBusy(true);

    let url = baseUrl + "/v1/sdk/initiate-purchase";

    const headers = {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    };

    let jsonBody = JSON.stringify(payload);

    fetch(url, { method: "POST", headers: headers, body: jsonBody })
      .then((response) => response.json())
      .then((json) => {
        if (json.responseCode == 1) {
          setFieldIndex(0);
          setNewTransactionRef(json.data.reference);
        } else {
          failedDialog(json.responseText);
        }
      })
      .catch((error) => {})
      .finally(() => {
        setBusy(false);
      });
  }

  function progressOrNavigate() {
    if (fieldIndex < chunkedFields().length - 1) {
      setFieldIndex(fieldIndex + 1);
    } else {
      if (newTransactionRef || transactionRef) {
        completePurchase();
      } else {
        if (paymentOption == "wallet") {
          initiateWalletPurchase(productData, formData);
        } else {
          if (Object.keys(formData).length != formFields.length) {
            const formErrorString = JSON.stringify(formError);
            failedDialog("Complete the form to proceed");
          } else if (Object.keys(formError).length > 0) {
            const formErrorString = JSON.stringify(formError);
            failedDialog("Form errors exist:" + formErrorString);
          } else {
            setFieldIndex(0);
            navigation.navigate("PaymentOptionScreen", {
              data: { product: productData, form: formData },
            });
          }
        }
      }
    }
  }

  function chunkedFields() {
    let chunkSize = 3;

    let chunkedFields = [];
    for (let i = 0; i < formFields.length; i += chunkSize) {
      const chunk = formFields.slice(i, i + chunkSize);
      chunkedFields.push(chunk);
    }

    return chunkedFields;
  }

  function resolveFields() {
    return chunkedFields()[fieldIndex];
  }

  async function uploadFiles() {
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("file", {
        uri: files[i].fileDetail.uri,
        type: "image/png",
        name: files[i].fileDetail.name,
      });

      let headers = {
        Authorization: "Bearer " + apiKey,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      };

      let url = baseUrl + "/v1/upload-file";

      try {
        let response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: formData,
        });

        let json = await response.json();

        if (json["responseCode"] == 1) {
          updateData(files[i].key, json["data"]["file_url"]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function completePurchase() {
    setBusy(true);

    uploadFiles().then(() => {
      updateData("is_full_year", true);

      let url = baseUrl + "/v1/sdk/complete-purchase";

      let headers = {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      };

      let body = JSON.stringify({
        payload: formData,
        reference:
          newTransactionRef && newTransactionRef !== ""
            ? newTransactionRef
            : transactionRef,
      });
      console.log("formData");
      console.log("formData");
      console.log(formData);
      fetch(url, { method: "POST", headers: headers, body })
        .then((response) => response.json())
        .then((json) => {
          if (json["responseCode"] == 1) {
            const extractedData = {
              updatedAt: json.data.updated_at,
              startDate: json.data.start_date,
              purchaseId: json.data.purchase_id,
              providerId: json.data.provider_id,
              activationDate: json.data.activation_date,
              isActive: json.data.active,
              buyerId: json.data.buyer_id,
              createdAt: json.data.created_at,
              customerId: json.data.customer_id,
              distributorId: json.data.distributor_id,
              dob: json.data.dob,
              email: json.data.email,
              expirationDate: json.data.expiration_date,
              firstName: json.data.first_name,
              geniusPrice: json.data.genius_price,
              id: json.data.id,
              lastName: json.data.last_name,
              marketPrice: json.data.market_price,
              meta: json.data.meta,
            };
            setPurchaseDetails(extractedData);
            setComplete(true);
          } else {
            Alert.alert("Request Failed", json["responseText"]);
          }
        })
        .finally(() => setBusy(false));
    });
  }

  function onFilePicked(key, file) {
    let pair = { key: key, fileDetail: { uri: file.uri, name: file.name } };
    setFiles((currentFiles) => [...currentFiles, pair]);
  }

  function onBackPressed() {
    if (fieldIndex > 0) {
      setFieldIndex(fieldIndex - 1);
    } else {
      if (hasPaid) {
        return true;
      } else {
        if (!newTransactionRef) {
          navigation.goBack();
        }
      }
    }
  }

  function onDone() {
    console.log("This is done");
    console.log(purchaseDetails);
    onComplete({
      result: "success",
      message: "Purchase completed successfully",
      data: purchaseDetails,
    });
    // navigation.navigate("ProductList");
  }

  if (complete)
    return (
      <SuccessScreen
        message={
          "Your purchase for " + productData["name"] + " was successful."
        }
        onDonePressed={onDone}
      />
    );
  else
    return (
      <ScrollView>
        <View style={{ height: screenHeight }}>
          <MCALayout onBackPressed={onBackPressed}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  padding: 12,
                  fontFamily: "metropolis_medium",
                  color: colorBlack,
                }}
              >
                {productData["name"]}
              </Text>
              <View
                style={{
                  backgroundColor: "#F6FEF9",
                  flexDirection: "row",
                  marginHorizontal: 12,
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginTop: 5,
                }}
              >
                <InfoIcon width={15} height={15} />
                <Text
                  style={{
                    paddingLeft: 10,
                    padding: 5,
                    width: "100%",
                    fontFamily: "metropolis_regular",
                    color: colorBlack,
                  }}
                >
                  Enter Details as it appears on legal document.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 12,
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}></View>
                <Text
                  style={{
                    fontFamily: "metropolis_regular",
                    color: colorBlack,
                  }}
                >
                  Underwritten By:{" "}
                </Text>
                {getImage(productData["prefix"])}
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              {resolveFields().map((element, index) => {
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

                if (dataType == "array") {
                  return (
                    <ItemPair
                      key={index}
                      onUpdate={onDataChange}
                      data={element}
                    />
                  );
                }

                switch (fieldType) {
                  case "file":
                    return (
                      <FilePicker
                        key={index}
                        onFilePicked={onFilePicked}
                        data={element}
                        errorString={formError[element["name"]]}
                      />
                    );
                  case "date":
                    return (
                      <MDatePicker
                        key={index}
                        dateValueChanged={onDataChange}
                        keyValue={element["label"]}
                        editable={false}
                        data={element}
                        errorString={formError[element["name"]]}
                      />
                    );
                  default:
                    return (
                      <MCATextField
                        key={index + element}
                        onDataChange={onDataChange}
                        valueString={
                          element["label"]
                            .toString()
                            .toLowerCase()
                            .includes("value") ||
                          element["label"]
                            .toString()
                            .toLowerCase()
                            .includes("cost") ||
                          element["label"]
                            .toString()
                            .toLowerCase()
                            .includes("price")
                            ? 
                            formatInput(formData[element["name"]])
                            : formData[element["name"]]
                        }
                        keyValue={element["label"]}
                        editable={true}
                        data={element}
                        errorString={formError[element["name"]]}
                      />
                    );
                }
              })}
            </View>
            <Button
              onPress={progressOrNavigate}
              color={colorPrimary}
              title="Continue"
            />
          </MCALayout>
          {busy ? (
            <View
              style={{
                zIndex: 2,
                flex: 1,
                height: "100%",
                width: "100%",
                marginTop: "6%",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colorGreyOverlay,
              }}
            >
              <ActivityIndicator
                style={{ margin: 12, color: "#3BAA90" }}
                animating={true}
              />
              <Text
                style={{
                  fontFamily: "metropolis_medium",
                  margin: 12,
                  fontSize: 16,
                  color: "white",
                }}
              >
                {" "}
                Sending request...{" "}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
}

export function getImage(name, showText = true) {
  let newName = name.toLowerCase();

  let style = { marginHorizontal: 5 };

  if (newName.includes("mcg") || newName.includes("mycovergenius")) {
    return <Image style={style} source={require("../assets/mcg.png")} />;
  } else if (newName.includes("aiico")) {
    return <Image style={style} source={require("../assets/aiico.png")} />;
  } else if (newName.includes("sti")) {
    return <Image style={style} source={require("../assets/sti.png")} />;
  } else if (newName.includes("flexicare")) {
    return <Image style={style} source={require("../assets/flexicare.png")} />;
  } else if (newName.includes("leadway")) {
    return <Image style={style} source={require("../assets/leadway.png")} />;
  } else {
    if (showText === true)
      return <Text style={style}>{name.toUpperCase()}</Text>;
    else return null;
  }
}
