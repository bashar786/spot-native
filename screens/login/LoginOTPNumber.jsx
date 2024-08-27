import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@/components/Header";
const {width} = Dimensions.get('window');
const isIPhone14Pro = width === 393; 
const isIPhone15ProMax = width === 430; 
import { CommonActions } from '@react-navigation/native';


const OTPScreen = () => {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber: routeEmail } = route.params;
  const inputRefs = useRef([]);
 

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    // Move to the next input if the text length is 1
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    // Move to the previous input if the text length is 0
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleEnter = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    setError("");
    setLoading(false);

  /*  try {
      const response = await fetch("http://192.168.1.3:3000/verifyOtp", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: routeEmail, otp: code }),
      });

      const data = await response.json();

      if (response.ok) {
        // OTP is verified successfully
        navigation.navigate("SetPinScreen"); // Replace with your next screen
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
      */
    setTimeout(() => {
      setLoading(false);

      // Reset navigation stack to the TransferMoney screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'TransferMoney' }], // 'TransferMoney' should be the name of your target screen
        })
      );
  }, 0); // Simulate network request delay

  };

  return (
    <View style={styles.container}>
    <Header title='Verify Mobile Number' />
      <StatusBar barStyle="light-content" />
    
        <View style={styles.content}>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
          Enter the verification code sent to
          </Text>
          <Text style={styles.email}>{routeEmail}</Text>
          <View style={styles.inputContainer}>
            {verificationCode.map((digit, index) => (
              <View key={index} style={styles.inputWrapper}>
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  returnKeyType="done"
                  selectionColor="#1D533C" 
                />
              </View>
            ))}
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.resendButtonContainer}>
            <Text style={styles.resendText}>Didn't receive code?</Text>
            <TouchableOpacity
              onPress={() => {
                /* Handle resend code */
              }}
              style={styles.resendButton}
            >
              <Text style={styles.resendButtonText}>Resend Now</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleEnter}
              style={[
                styles.verifyButton,
                verificationCode.some((digit) => digit === "")
                  ? { backgroundColor: "#66B18A" }
                  : { backgroundColor: "#1C533C" },
              ]}
              activeOpacity={1}
              disabled={verificationCode.length !== 6}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
          {loading && (
            <Modal transparent={true} visible={true} animationType="fade">
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            </Modal>
          )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoidingContainer: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginTop: 35,
  },
  title: {
    fontSize: 37,
    color: "#1D533C",
    marginBottom: 10,
    fontFamily: 'Urbanist-Bold',
  },
  subtitle: {
    fontSize: 21,
    color: "#535764",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    paddingTop: 13
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 35
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#1D533C',
    fontSize: 38,
    fontFamily: "Poppins-Medium",
    marginHorizontal: 5,
    color: '#444'
  },
  resendButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    marginTop: 51,
    alignItems: 'center'
  },
  resendText: {
    color: '#615F5F',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  resendButtonText: {
    color: "#1D533C",
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 94,
    width: "100%",
    alignItems: "center",
    marginHorizontal: 20
  },
  verifyButton: {
    padding: 16,
    alignItems: "center",
    width: "100%",
    borderRadius: 16,
  },
  verifyButtonText: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
  email: {
    color: "#1C533C",
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 33
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OTPScreen;
