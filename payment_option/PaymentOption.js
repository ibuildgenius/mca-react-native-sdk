import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import MCALayout from "../components/MCALayout";
import { useState, useEffect } from "react";
import SuccessScreen from "../components/SuccessScreen";
import { colorBlack, colorGreyOverlay } from "../style/colors";
import { useApiKeyStore } from "../store/urlApiKeyStore";
import { usePaymentStore } from "../store/paymentStore";
import { currencify } from "../api/constants";
import BackButton from "../assets/back.svg";
import { styles } from "../style/styles";

export default function PaymentOption({ navigation, route }) {
  let product = route.params.data.product;
  let formData = route.params.data.form;
  let [loading, setLoading] = useState(false);
  let [buttonText, setButtonText] = useState("Get Covered");
  let [paymentDetails, setPaymentDetails] = useState({});
  let [paymentResponse, setPaymentResponse] = useState({});
  let [paymentVerified, setPaymentVerified] = useState(false);
  let [bankLists, setBankLists] = useState({});
  let [selectedBankCode, setSelectedBankCode] = useState("");

  let [showBankLists, setShowBankLists] = useState(false);
  let [message, setMessage] = useState("Sending request...");
  let { apiKey, baseUrl } = useApiKeyStore();
  let { setHasPaid } = usePaymentStore();

  let { hasPaid } = usePaymentStore();

  function getUssdProvider() {

    let url = baseUrl + "/v1/sdk/ussd-providers";

    const headers = {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    };

    fetch(url, { method: "GET", headers: headers })
      .then((response) => response.json())
      .then((json) => {
        if (json.responseCode == 1) {
          // setShowBankLists(true)
          setBankLists(json);
          console.log(showBankLists);
          console.log(bankLists);
          console.log(json, "THis is the get response ooo");
          console.log(bankLists.data);
        } else {
          failedDialog(json.responseText);
        }
      })
      .catch((error) => {});
  }

  useEffect(() => {
    getUssdProvider();
  }, []);

  const [paymentString, setPaymentString] = useState("bank transfer");


  const setPaymentDetailsToUssd = () => {
    setPaymentString("ussd");
  };

  const setPaymentDetailsToTransfer = () => {
    setPaymentString("bank transfer");
  };

  const handleBankSelection = (bankCode) => {
    setSelectedBankCode(bankCode);
    // Perform any other necessary actions after bank selection
  };

  function failedDialog(message) {
    Alert.alert("Transaction Failed", message);
  }

  function initiatePurchase() {
    formData.product_id = product.id;

    let payload = {
      instance_id: global.instanceId,
      payment_channel:
        paymentString == "ussd"
          ? {
              channel: paymentString,
              bank_code: selectedBankCode,
            }
          : {
              channel: paymentString,
            },
      payload: formData,
    };

    setLoading(true);

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
          console.log("I have sent the money");
          console.log(json)

          setButtonText("I have sent the money");
          setPaymentDetails(json);
        } else {
          failedDialog(json.responseText);
        }
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  }
  function verifyPayment() {
    setMessage("Verifying transaction...");
    setLoading(true);

    let url = baseUrl + "/v1/sdk/verify-transaction";

    let body = JSON.stringify({
      transaction_reference: paymentDetails.data.reference,
    });

    let headers = {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    };

    fetch(url, { method: "POST", headers: headers, body: body })
      .then((response) => response.json())
      .then((json) => {
        if (json.responseCode == 1) {
          setPaymentResponse(json.data);
          setHasPaid(true);
          console.log(hasPaid, "Has PAID");
          setPaymentVerified(true);
        } else {
          Alert.alert("Unable to Verify", json.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  function navigateToNext() {
    navigation.navigate("ProductForm", {
      data: product,
      formData: formData,
      transactionRef: paymentResponse.reference,
    });
  }

  var hasSubmitted = paymentDetails.responseCode == 1;
  function renderLayout() {
    if (paymentDetails.responseCode == 1) {
      let bankDetails = paymentDetails.data;
      return (
        <View
          style={{
            flex: 1,
            marginVertical: 8,
            backgroundColor: "#F9FAFB",
            marginHorizontal: 10,
          }}
        >
          <View
            style={{ flex: 5, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontFamily: "metropolis_regular",
                marginVertical: 12,
                color: colorGreyOverlay,
              }}
            >
              {bankDetails.message}
            </Text>
            <View
              style={{
                width: "80%",
                marginVertical: 12,
                borderBottomColor: "#D0D5DD",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text
              style={{
                fontFamily: "metropolis_bold",
                textAlign: "center",
                fontSize: 25,
                fontWeight: "600",
                marginVertical: 12,
                color: colorBlack,
              }}
            >
              {bankDetails.bank + "\n" + bankDetails.account_number}
            </Text>
            <View
              style={{
                width: "80%",
                marginVertical: 12,
                borderBottomColor: "#D0D5DD",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <View style={{ flex: 3 }} />
        </View>
      );
    } else if (showBankLists) {
      return (
        <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 5 }}>
          <Text
            style={{
              marginTop: 18,
              fontSize: 18,
              fontFamily: "metropolis_bold",
              color: colorBlack,
            }}
          >
            Select Bank
          </Text>
          <Text
            style={{
              color: "#667085",
              marginTop: 2,
              marginBottom: 20,
              fontSize: 13,
              fontFamily: "metropolis_regular",
            }}
          >
            Choose a bank to proceed
          </Text>

          {bankLists.data.map((item, index) => (
            // vv
            <TouchableOpacity
              key={index}
              onPress={() => handleBankSelection(item.type)}
            >
              <View
                key={index}
                style={{ opacity: selectedBankCode === item.type ? 1 : 0.8 }}
              >
                <PaymentOptionCard
                  imagePath={require("../assets/ussd.png")}
                  selected={selectedBankCode === item.type}
                  title={item.bank_name}
                  sub={"Code: " + item.type}
                />
              </View>
            </TouchableOpacity>
          ))}
          {/* <TouchableOpacity onPress={setPaymentDetailsToTransfer}>
          <View style={{opacity: (paymentString == "bank transfer")?1 : 0.8 }}>
          <PaymentOptionCard
            imagePath={require("../assets/transfer.png")}
            selected={paymentString == "bank transfer"}
            title="Transfer"
            sub="Send to bank account"
          />
           </View>
           </TouchableOpacity>
  
          <TouchableOpacity onPress={setPaymentDetailsToUssd}>
          <View style={{opacity: (paymentString == "ussd")?1 : 0.8 }}>
            <PaymentOptionCard
              imagePath={require("../assets/ussd.png")}
              selected={paymentString == "ussd"}
              title="USSD"
              sub="Select any bank to generate USSD"
            />
          </View>
  
          </TouchableOpacity> */}
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 5 }}>
        <Text
          style={{
            marginTop: 18,
            fontSize: 18,
            fontFamily: "metropolis_bold",
            color: colorBlack,
          }}
        >
          Select Payment Method
        </Text>
        <Text
          style={{
            color: "#667085",
            marginTop: 2,
            marginBottom: 20,
            fontSize: 13,
            fontFamily: "metropolis_regular",
          }}
        >
          Choose an option to proceed
        </Text>
        <PaymentOptionCard
          imagePath={require("../assets/transfer.png")}
          selected={paymentString == "bank transfer"}
          title="Transfer"
          sub="Send to bank account"
        />
        <View style={{ opacity: 0.2 }}>
          <PaymentOptionCard
            imagePath={require("../assets/ussd.png")}
            selected={paymentString == "ussd"}
            title="USSD"
            sub="Select any bank to generate USSD"
          />
        </View>
        {/* <TouchableOpacity onPress={setPaymentDetailsToTransfer}>
          <View style={{ opacity: paymentString == "bank transfer" ? 1 : 0.8 }}>
            <PaymentOptionCard
              imagePath={require("../assets/transfer.png")}
              selected={paymentString == "bank transfer"}
              title="Transfer"
              sub="Send to bank account"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={setPaymentDetailsToUssd}>
          <View style={{ opacity: paymentString == "ussd" ? 1 : 0.8 }}>
            <PaymentOptionCard
              imagePath={require("../assets/ussd.png")}
              selected={paymentString == "ussd"}
              title="USSD"
              sub="Select any bank to generate USSD"
            />
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }

  // function renderLayout() {
  //   if (paymentDetails.responseCode == 1) {
  //     let bankDetails = paymentDetails.data;
  //     return (
  //       <View
  //         style={{
  //           flex: 1,
  //           marginVertical: 8,
  //           backgroundColor: "#F9FAFB",
  //           marginHorizontal: 10,
  //         }}
  //       >
  //         <View
  //           style={{ flex: 5, alignItems: "center", justifyContent: "center" }}
  //         >
  //           <Text
  //             style={{
  //               fontFamily: "metropolis_regular",
  //               marginVertical: 12,
  //               color: colorGreyOverlay,
  //             }}
  //           >
  //             {bankDetails.message}
  //           </Text>
  //           <View
  //             style={{
  //               width: "80%",
  //               marginVertical: 12,
  //               borderBottomColor: "#D0D5DD",
  //               borderBottomWidth: StyleSheet.hairlineWidth,
  //             }}
  //           />
  //           <Text
  //             style={{
  //               fontFamily: "metropolis_bold",
  //               textAlign: "center",
  //               fontSize: 25,
  //               fontWeight: "600",
  //               marginVertical: 12,
  //               color: colorBlack,
  //             }}
  //           >
  //             {bankDetails.bank + "\n" + bankDetails.account_number}
  //           </Text>
  //           <View
  //             style={{
  //               width: "80%",
  //               marginVertical: 12,
  //               borderBottomColor: "#D0D5DD",
  //               borderBottomWidth: StyleSheet.hairlineWidth,
  //             }}
  //           />
  //         </View>
  //         <View style={{ flex: 3 }} />
  //       </View>
  //     );
  //   }

  //   return (
  //     <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 5 }}>
  //       <Text
  //         style={{
  //           marginTop: 18,
  //           fontSize: 18,
  //           fontFamily: "metropolis_bold",
  //           color: colorBlack,
  //         }}
  //       >
  //         Select Payment Method
  //       </Text>
  //       <Text
  //         style={{
  //           color: "#667085",
  //           marginTop: 2,
  //           marginBottom: 20,
  //           fontSize: 13,
  //           fontFamily: "metropolis_regular",
  //         }}
  //       >
  //         Choose an option to proceed
  //       </Text>
  //       <TouchableOpacity onPress={setPaymentDetailsToTransfer}>
  //       <View style={{opacity: (paymentString == "bank transfer")?1 : 0.8 }}>
  //       <PaymentOptionCard
  //         imagePath={require("../assets/transfer.png")}
  //         selected={paymentString == "bank transfer"}
  //         title="Transfer"
  //         sub="Send to bank account"
  //       />
  //        </View>
  //        </TouchableOpacity>

  //       <TouchableOpacity onPress={setPaymentDetailsToUssd}>
  //       <View style={{opacity: (paymentString == "ussd")?1 : 0.8 }}>
  //         <PaymentOptionCard
  //           imagePath={require("../assets/ussd.png")}
  //           selected={paymentString == "ussd"}
  //           title="USSD"
  //           sub="Select any bank to generate USSD"
  //         />
  //       </View>

  //       </TouchableOpacity>

  //     </View>
  //   );
  // }

  function handleButtonBehavior() {
    if (!hasSubmitted) {
      if (paymentString == "ussd" && !showBankLists) {
        if (bankLists) {
          setShowBankLists(true);
        } else {
          getUssdProvider();
        }
      } else {
        initiatePurchase();
      }
    } else {
      verifyPayment();
    }
  }

  // function nextScreen() {
  //     if (paymentResponse["responseCode"] == 1) {

  //     }
  // }
  function onBackPressed() {
    navigation.goBack();
  }

  if (paymentVerified) {
    return (
      <SuccessScreen
        message={"Payment Verified,\nplease fill out the remaining fields"}
        onDonePressed={navigateToNext}
      />
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <MCALayout>
        {hasSubmitted ? (
          <></>
        ) : (
          <View
            style={{
              position: "relative",
              alignItems: "center",
              paddingBottom: 5,
            }}
          >
            <Pressable
              style={{ position: "absolute", left: 0, top: 0, padding: 12 }}
              onPress={onBackPressed}
            >
              <BackButton width={30} height={30} />
            </Pressable>

            <Image style={styles.logo} source={require("../assets/logo.png")} />
          </View>
        )}
        <View style={{ flex: 1, flexDirection: "column", paddingTop: 10 }}>
          <View style={{ flex: 1 }}>
            <View style={style.bio}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "metropolis_medium",
                  color: colorBlack,
                  paddingBottom: 5,
                }}
              >
                {hasSubmitted ? formData.email : product.name}
              </Text>
              <Text
                style={{
                  fontFamily: "metropolis_regular",
                  paddingBottom: 10,
                  fontSize: 15,
                }}
              >
                {hasSubmitted ? (
                  <Text>
                    <Text style={{ color: colorBlack }}>Pay </Text>
                    <Text
                      style={{
                        fontFamily: "metropolis_bold",
                        color: "#039855",
                        fontSize: 19,
                      }}
                    >
                      {"₦" + currencify(paymentDetails.data.amount)}
                    </Text>
                  </Text>
                ) : (
                  formData.email
                )}
              </Text>
            </View>
            {
              // showBankLists ?
              // :
              renderLayout()
            }
          </View>
          <Button
            title={buttonText}
            onPress={handleButtonBehavior}
            color="#3BAA90"
          />
        </View>
      </MCALayout>
      {loading ? (
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
            {message}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
  bio: {
    padding: 8,
    paddingTop: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginVertical: 8,
    alignItems: "flex-end",
    backgroundColor: "#F6FEF9",
    borderRadius: 5,
  },
});

export function PaymentOptionCard(props) {
  let style = StyleSheet.create({
    card: {
      marginVertical: 8,
      flexDirection: "row",
      paddingVertical: 12,
      borderWidth: 1,
      paddingHorizontal: 8,
      borderColor: "#667085",
      borderRadius: 5,
    },
    cardSelected: {
      marginVertical: 8,
      flexDirection: "row",
      paddingVertical: 12,
      borderWidth: 1,
      paddingHorizontal: 8,
      borderColor: "#3BAA90",
      borderRadius: 5,
    },
  });
  const selected = props.selected;
  return (
    <View style={selected ? style.cardSelected : style.card}>
      <Image source={props.imagePath} />
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{
            fontWeight: "600",
            fontFamily: "metropolis_medium",
            fontSize: 15,
            color: colorBlack,
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontSize: 12,
            fontFamily: "metropolis_regular",
            color: colorBlack,
          }}
        >
          {props.sub}
        </Text>
      </View>
    </View>
  );
}
