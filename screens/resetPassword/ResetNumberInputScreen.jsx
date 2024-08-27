import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, Image, TextInput, Dimensions, StatusBar } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updatedUserInfo } from "@/store/slice/UserInfoSlice";
import { Provider as PaperProvider } from "react-native-paper";
import Header from "@/components/Header";

const { width } = Dimensions.get('window');
const isIPhone14Pro = width === 393; 
const isIPhone15ProMax = width === 430; 

const NumberInputScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleNumberChange = (text) => {
    const formatted = text.replace(/\D/g, ""); // Remove non-digit characters

    // Format the phone number based on its length
    let formattedPhoneNumber = "";
    if (formatted.length > 0) {
      formattedPhoneNumber += `(${formatted.slice(0, 2)}`;
    }
    if (formatted.length >= 3) {
      formattedPhoneNumber += `) ${formatted.slice(2, 5)}`;
    }
    if (formatted.length >= 6) {
      formattedPhoneNumber += `-${formatted.slice(5, 10)}`;
    }

    setPhoneNumber(formattedPhoneNumber); // Update state with formatted phone number
    dispatch(updatedUserInfo({ number: formatted })); // Dispatch the number to Redux or your state management
  };

  const isPhoneNumberValid = phoneNumber.length === 13; // Adjust the length for the formatted number

  const handleContinue = async () => {
    Keyboard.dismiss();
    if (!isPhoneNumberValid) {
      setError("Please enter a valid phone number");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("ResetOTPNumber", { phoneNumber: `+971 ${phoneNumber}` });
    }, 10);
  };

  return (
    <PaperProvider style={{ backgroundColor: '#fff' }}>
            <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Header title="Enter Mobile Number" />
        </View>

        {/* Input and Description Section */}
        <KeyboardAvoidingView
          style={styles.inputSection}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.inputScrollView}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inputArea}>
              <Text style={styles.inputLabel}>
                UAE Mobile Number
              </Text>
              <View style={styles.inputWrapper}>
                <View style={styles.prefixDiv}>
        <Image source={require('../../assets/images/uaeflag.png')} />
                  <Text style={styles.prefixText}>+971</Text>
                </View>
                <TextInput
                  placeholder="(00) 000-0000"
                  placeholderTextColor="grey"
                  style={styles.textInput}
                  value={phoneNumber}
                  onChangeText={handleNumberChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  keyboardType="numeric"
                  maxLength={13} // Adjust the max length for the formatted number
                  error={!!error}
                  selectionColor="#1D533C"
                  returnKeyType="done"
                />
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <Text style={styles.description}>
                You consent to receive automated texts to the mobile phone number provided
                for authentication and payment notifications from SPOT®. Text STOP to
                opt out and HELP for help. Message and data rates may apply.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* End Content Section */}
        <View style={styles.endContent}>
          {loading && (
            <Modal transparent={true} visible={true} animationType="fade">
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            </Modal>
          )}

          <TouchableOpacity
            style={[
              styles.ContinueButton,
              { backgroundColor: isPhoneNumberValid ? "#1E3B2F" : "#66B18A" },
            ]}
            disabled={!isPhoneNumberValid || loading}
            onPress={handleContinue}
            activeOpacity={0.5}
          >
            <Text style={styles.ContinueText}>Continue</Text>
          </TouchableOpacity>

          <Text
            style={styles.footerText}
            onPress={() => navigation.navigate("PrivacyScreen")}
          >
            Terms of Use & Privacy Policy
          </Text>
        </View>
      </View>
    </PaperProvider>
  );
};

export default NumberInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
  },
  inputSection: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputScrollView: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputArea: {
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 25
  },
  inputLabel: {
    paddingBottom: 10,
    fontFamily: 'Poppins-Medium',
    color: '#1D533C',
    fontSize: 19,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 23,
    borderRadius: 10,
    paddingVertical: 12
  },
  prefixDiv: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  prefixText: {
    color: '#1D533C',
    fontSize: 19,
    fontFamily: 'Poppins-SemiBold',
    paddingLeft: 15
  },
  textInput: {
    flex: 1,
    fontSize: isIPhone14Pro ? 18 : isIPhone15ProMax ? 19 : 18,
    fontFamily: 'Poppins-Medium',
    color: '#444444',
    borderRadius: 10,
    paddingLeft: 5
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    paddingLeft: 28,
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 12,
    color: "#53575F",
    paddingTop: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: "justify",
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  endContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 49,
  },
  ContinueButton: {
    padding: 16,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    alignSelf: 'center',
    backgroundColor: '#fff', // Ensure button has proper background
    marginBottom: 25
  },
  ContinueText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  footerText: {
    color: "#1D533C",
    fontSize: 13.5,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
