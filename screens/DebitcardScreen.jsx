import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useNavigation } from "expo-router";
import { UpdatedDebitCardInfo } from "@/store/slice/UserInfoSlice";
import Header from "../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DebitCardScreen = () => {
  const navigation = useNavigation();
  const [maskedDebitCardNumber, setMaskedDebitCardNumber] = useState("");
  const [fullDebitCardNumber, setFullDebitCardNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [buttonColor, setButtonColor] = useState("#66B18A");
  const [cardType, setCardType] = useState("unknown");
  const [loading, setLoading] = useState(false);
  const [cvv, setCvv] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isCVVFocused, setIsCVVFocused] = useState(false);

  const dispatch = useDispatch();

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const expiryDateInputRef = useRef(null);
  const cvvInputRef = useRef(null);

  useEffect(() => {
    setButtonColor(
      maskedDebitCardNumber && firstName && lastName && expiryDate && cvv
        ? '#1D3B2F'
        : "#66B18A"
    );
  }, [maskedDebitCardNumber, firstName, lastName, expiryDate, cvv]);

  useEffect(() => {
    if (fullDebitCardNumber) {
      setCardType(detectCardType(fullDebitCardNumber));
    }
  }, [fullDebitCardNumber]);

  const detectCardType = (number) => {
    const cardPatterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5[0-9]{2})/,
      diners: /^3(?:0[0-5]|[68][0-9])/,
      jcb: /^(?:2131|1800|35\d{3})/,
      unionpay: /^(62|88)/,
      maestro: /^(50|56|57|58|6\d{2})/,
      rupay: /^(60|65|81|82|508)/,
      mir: /^220[0-4]/,
      elo: /^4011|^5067|^5090|^6277|^6363|^6362/,
      interpayment: /^636/,
      troy: /^65|^636/,
    };

    for (const [cardType, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(number)) {
        return cardType;
      }
    }
    return "unknown";
  };

  const handleContinue = () => {
    if (maskedDebitCardNumber && firstName && lastName && expiryDate && cvv) {
      setLoading(true);
      dispatch(
        UpdatedDebitCardInfo({
          debitCardNumber: fullDebitCardNumber,
          firstName,
          lastName,
          expiryDate,
          cvv,
        })
      );
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("AddressScreen");
      }, 1000);
    }
  };

  const handleExpiryDateChange = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 4);
    const formatted = cleaned.replace(/(\d{2})(\d{2})/, "$1/$2");
    setExpiryDate(formatted);
  };

  const maskCardNumber = (number) => {
    const visibleDigits = 4;
    const maskedPart = "•".repeat(Math.max(0, number.length - visibleDigits));
    const lastDigits = number.slice(-visibleDigits);

    return `${maskedPart.replace(/(.{4})/g, "$1 ")}${lastDigits}`.trim();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setMaskedDebitCardNumber(maskCardNumber(fullDebitCardNumber));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setMaskedDebitCardNumber(fullDebitCardNumber.replace(/(.{4})(?=\d)/g, "$1 ").trim());
  };

  const updateDebitCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 16);
    setFullDebitCardNumber(cleaned);
    setMaskedDebitCardNumber(isFocused ? cleaned.replace(/(.{4})(?=\d)/g, "$1 ").trim() : maskCardNumber(cleaned));
    dispatch(
      UpdatedDebitCardInfo({
        debitCardNumber: cleaned,
        firstName,
        lastName,
        expiryDate,
        cvv,
      })
    );
  };

  const getCardImage = () => {
    const cardImages = {
      visa: require("../assets/images/visa.png"),
      mastercard: require("../assets/images/mastercard.png"),
      amex: require("../assets/images/amex.png"),
      discover: require("../assets/images/discover.png"),
      diners: require("../assets/images/diners.png"),
      jcb: require("../assets/images/jcb.jpeg"),
      unionpay: require("../assets/images/unionpay.svg"),
      maestro: require("../assets/images/maestro.png"),
      mir: require("../assets/images/mir.png"),
      elo: require("../assets/images/elo.png"),
      interpayment: require("../assets/images/interpay.jpg"),
      troy: require("../assets/images/troy.png"),
      default: require("../assets/images/camera.png"),
    };
    return cardImages[cardType] || cardImages.default;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" />
      
      <Header title="Add Debit Card" />

      <Text style={styles.verifyText}>Enter & verify your debit card information</Text>

      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true} // This ensures the scrolling works on Android
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Debit Card Number</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.cardInputContainer}>
              <TextInput
                value={maskedDebitCardNumber}
                onChangeText={updateDebitCardNumber}
                placeholder="Debit Card Number"
                placeholderTextColor="#7C7B7B"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                keyboardType="numeric"
                maxLength={19}
                contentStyle={styles.inputContentDebit}
                returnKeyType="done"
                blurOnSubmit={false} // Keep the keyboard open
                selectionColor="#1D533C"
                theme={{
                  colors: {
                    primary: "#F2F2F2",
                  },
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onSubmitEditing={() => firstNameInputRef.current?.focus()} // Focus on next input
              />
              <Image source={getCardImage()} style={styles.cardIcon} />
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            ref={firstNameInputRef}
            value={firstName}
            onChangeText={setFirstName}
            mode="flat"
            style={styles.input}
            underlineColor="transparent"
            placeholder="First Name"
            placeholderTextColor="#7C7B7B"
            returnKeyType="next"
            blurOnSubmit={false} // Keep the keyboard open
            selectionColor="#1D533C"
            contentStyle={styles.inputContent}
            theme={{
              colors: {
                primary: "#F2F2F2",
              },
              fonts: {
                regular: {
                  fontFamily: "Poppins-Regular",
                },
                medium: {
                  fontFamily: "Poppins-Medium",
                },
              },
            }}
            onSubmitEditing={() => lastNameInputRef.current?.focus()} // Focus on next input
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            ref={lastNameInputRef}
            value={lastName}
            onChangeText={setLastName}
            mode="flat"
            style={styles.input}
            underlineColor="transparent"
            placeholder="Last Name"
            placeholderTextColor="#7C7B7B"
            returnKeyType="next"
            blurOnSubmit={false} // Keep the keyboard open
            selectionColor="#1D533C"
            contentStyle={styles.inputContent}
            theme={{
              colors: {
                primary: "#F2F2F2",
              },
              fonts: {
                regular: {
                  fontFamily: "Poppins-Regular",
                },
                medium: {
                  fontFamily: "Poppins-Medium",
                },
              },
            }}
            onSubmitEditing={() => expiryDateInputRef.current?.focus()} // Focus on next input
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.halfInput]}>
            <Text style={styles.label}>Expiration Date</Text>
            <TextInput
              ref={expiryDateInputRef}
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              placeholder="MM/YY"
              placeholderTextColor="#7C7B7B"
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              keyboardType="numeric"
              maxLength={5}
              contentStyle={styles.inputContent}
              returnKeyType="done"
              blurOnSubmit={false} // Keep the keyboard open
              selectionColor="#1D533C"
              theme={{
                colors: {
                  primary: "#F2F2F2",
                },
              }}
              onSubmitEditing={() => cvvInputRef.current?.focus()} // Focus on next input
            />
          </View>

          <View style={[styles.inputContainer, styles.halfInput]}>
            <Text style={styles.label}>Security Code/CVV</Text>
            <TextInput
              ref={cvvInputRef}
              value={isCVVFocused ? cvv : "•".repeat(cvv.length)}
              onChangeText={(text) => setCvv(text.replace(/\D/g, "").slice(0, 3))}
              onFocus={() => setIsCVVFocused(true)}
              onBlur={() => setIsCVVFocused(false)}
              placeholder="000"
              placeholderTextColor="#7C7B7B"
              style={styles.input}
              underlineColor="transparent"
              keyboardType="numeric"
              maxLength={3}
              contentStyle={styles.inputContent}
              returnKeyType="done"
              blurOnSubmit={true} // Close the keyboard after this field
              selectionColor="#1D533C"
              theme={{
                colors: {
                  primary: "#F2F2F2",
                },
              }}
              onSubmitEditing={handleContinue} // Handle continue on done
            />
          </View>
        </View>

        <Modal visible={loading} transparent>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </Modal>
      </KeyboardAwareScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={[styles.button, { backgroundColor: buttonColor }]}
          disabled={
            !maskedDebitCardNumber ||
            !firstName ||
            !lastName ||
            !expiryDate ||
            !cvv
          }
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContainer: {},
  verifyText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginTop: 10,
    textAlign: "center",
    color: "#454955",
  },
  inputContainer: {
    paddingHorizontal: 15,
    borderBottomColor: "#F2F2F2",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#F2F2F2",
  },
  cardInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingLeft: 0,
    paddingRight: 10, // Add some padding for the icon
    color: "#444444",
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 10,
    color: "#444444",
    backgroundColor: "#F2F2F2",
  },
  inputContent: {
    fontFamily: "Poppins-Medium",
    fontSize: 19,
    color: "#444444",
    borderBottomWidth: 0,
    borderBottomColor: "#F2F2F2",
  },
  inputContentDebit: {
    fontFamily: "Poppins-Medium",
    fontSize: 19,
    color: "#444444",
    borderBottomWidth: 0,
    borderBottomColor: "#F2F2F2",
  },
  cardIcon: {
    width: 52,
    height: 32,
    resizeMode: "contain",
  },
  label: {
    fontFamily: "Poppins-Medium",
    color: "#1D533C",
    fontSize: 16,
    paddingBottom: 10,
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 0.5,
  },
  buttonContainer: {
    paddingVertical: 17,
    borderRadius: 15,
    width: "93%",
    alignSelf: "center",
    marginBottom: 75, // Adjusted to prevent overlap with other components
  },
  button: {
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default DebitCardScreen;
