import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  Dimensions,
  TextInput as RNTextInput,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updatedUserInfo } from "@/store/slice/UserInfoSlice";
import { Provider as PaperProvider } from "react-native-paper";
import { Foundation } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const passwordInputRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleNumberChange = (text) => {
    const formatted = text.replace(/\D/g, "");
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
    setPhoneNumber(formattedPhoneNumber);
    dispatch(updatedUserInfo({ number: formatted }));
  };

  const isPhoneNumberValid = phoneNumber.length === 13;
  const isPasswordValid = password.length === 6;

  const handleContinue = async () => {
    Keyboard.dismiss();
    if (!isPhoneNumberValid || !isPasswordValid) {
      setError("Please enter a valid phone number and password.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("LoginOTPNumber", {
        phoneNumber: `+971 ${phoneNumber}`,
      });
    }, 0);
  };

  const togglePasswordVisibility = () => {
    setShowPin(!showPin);
  };

  return (
    <PaperProvider>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputSection}
          >
            <View style={styles.topContainer}>
              <Image
                style={styles.logo}
                source={require("../../assets/images/logo.png")}
              />
              </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.inputArea}>
              <Text style={styles.loginText}>Log in</Text>
              <Text style={styles.subText}>Log Into Your Account To Continue</Text>
          
                <View style={[styles.inputWrapper, { marginBottom: 20 }]}>
              
                  <View style={styles.prefixDiv}>
                    <Image source={require('../../assets/images/phone.png')} />
                    {(isFocused || phoneNumber.length > 0) && (
                      <Text style={styles.prefixText}>+971</Text>
                    )}
                  </View>
               
                  <RNTextInput
                    placeholder={isFocused || phoneNumber.length > 0 ? "(00) 000-0000" : "Phone Number"}
                    placeholderTextColor="grey"
                    style={[styles.textInput, { paddingLeft: isFocused || phoneNumber.length > 0 ? 10 : 10 }]}
                    value={phoneNumber}
                    onChangeText={handleNumberChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType="numeric"
                    maxLength={13}
                    selectionColor="#1D533C"
                    returnKeyType="done"  // Set the return key type to 'next'
                    onSubmitEditing={() => passwordInputRef.current.focus()}  // Focus the password input
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Foundation
                      name="key"
                      size={30}
                      color="#1D533C"
                    />
                  </View>
                  <RNTextInput
                    ref={passwordInputRef}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.textInput}
                    keyboardType="numeric"
                    maxLength={6}
                    placeholder="6-Digit PIN"
                    secureTextEntry={!showPin}
                    placeholderTextColor="grey"
                    selectionColor="#1D533C"
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIconContainer}
                  >
                    <Icon
                      name={showPin ? "visibility" : "visibility-off"}
                      size={24}
                      color="#1D533C"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("ResetNumberScreen")}>
                  <Text
                    style={[
                      styles.signup,
                      {
                        textAlign: "right",
                        textDecorationLine: "underline",
                        marginTop: 20,
                        color: '#fff',
                        fontSize: 15,
                        fontFamily: 'Poppins-Medium',
                        marginBottom: 30
                      },
                    ]}
                  >
                    Forgot PIN?
                  </Text>
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

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
                styles.continueButton,
                { backgroundColor: isPhoneNumberValid && isPasswordValid ? "#1D533C" : "#66B18A" },
              ]}
              disabled={!isPhoneNumberValid || loading}
              onPress={handleContinue}
              activeOpacity={0.5}
            >
              <Text style={styles.continueText}>Log in</Text>
            </TouchableOpacity>
            <View style={{ height: 97, justifyContent: 'center' }}>
              <Text style={styles.signupText}>
                Don't have an Account? <TouchableOpacity onPress={() => navigation.navigate('NumberInputScreen')}><Text style={styles.signUp}>SIGN UP</Text></TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D3B2F",
    justifyContent: 'flex-end',
    paddingTop: 200
  },
  topContainer: {
    flex: 6,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  logo: {
    width: 326,
    height: 100.8,
    marginBottom: 46
  },
  loginText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
    fontSize: 35,
    textAlign: 'center'
  },
  subText: {
    color: "#FFFFFF",
    fontFamily: "Urbanist-Medium",
    fontSize: 20,
    lineHeight :24,
    textAlign: 'center',
    marginBottom: 40,
    paddingTop: 13
  },
  inputSection: {
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputArea: {
    width: "100%",
  },
  inputLabel: {
    paddingBottom: 10,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  prefixDiv: {
    flexDirection: "row",
    alignItems: "center",
  },
  prefixText: {
    color: "#1D533C",
    fontSize: 19,
    fontFamily: "Poppins-SemiBold",
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 19,
    fontFamily: "Poppins-Medium",
    color: "#1D533C",
    borderRadius: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  eyeIconContainer: {
    marginLeft: 10,
  },
  continueButton: {
    padding: 16,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
    marginTop: 10,
  },
  signupText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  signUp: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,

  },
  endContent: {
    paddingHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default LoginScreen;
