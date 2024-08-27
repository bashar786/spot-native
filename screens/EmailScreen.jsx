import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, TextInput, Dimensions, StatusBar } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updatedUserInfo } from "@/store/slice/UserInfoSlice";
import Header from "@/components/Header";
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isIPhone14Pro = width === 393;
const isIPhone15ProMax = width === 430;

const EmailScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleContinue = async () => {
    if (email.trim() === "") {
      setError("required");
      return;
    } else if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    setLoading(false);

    dispatch(updatedUserInfo({ email }));
    navigation.navigate('OTPScreenEmail', { email });
  };

  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
                       <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Header title="Enter Email" />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputArea}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Feather name="mail" size={32} color="#1E3B2F" />
              </View>
              <TextInput
                selectionColor="#1D533C"
                placeholder="Enter your email"
                placeholderTextColor="#8D8D8D"
                style={styles.textInput}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                returnKeyType="done"
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.description}>
              By continuing you agree to receive an authorization code to the email provided.
            </Text>
          </View>
        </ScrollView>
        {loading && (
          <Modal transparent={true} visible={true} animationType="fade">
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          </Modal>
        )}
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: email.trim() === "" || error ? "#66B18A" : "#1E3B2F" },
        ]}
        disabled={loading}
        onPress={handleContinue}
        activeOpacity={0.5}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Conditionally render the Terms and Conditions text */}
      <View style={styles.footerContainer}>
        <Text
          style={[
            styles.footerText,
            { color: email.trim() !== "" ? "#1E3B2F" : "#FFFFFF" }, // Change text color conditionally
          ]}
          onPress={() => email.trim() !== "" && navigation.navigate("PrivacyScreen")}
        >
          Terms of Use & Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputArea: {
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  inputLabel: {
    paddingBottom: 10,
    fontFamily: "Poppins-Medium",
    color: "#1D533C",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingVertical: 15,
  },
  iconContainer: {
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 19,
    fontFamily: "Poppins-Medium",
    color: "#444444",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    paddingLeft: 5,
    fontFamily: "Poppins-Regular",
  },
  description: {
    fontSize: 12,
    color: "#53575F",
    paddingTop: 20,
    fontFamily: "Poppins-Regular",
    textAlign: "justify",
    paddingHorizontal: 0,
  },
  continueButton: {
    padding: 16,
    borderRadius: 16,
    width: "91%",
    alignItems: "center",
    alignSelf: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
  footerContainer: {
    height: 94, // Set the height to 94 pixels
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 13.5,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
