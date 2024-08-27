import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  TextInput,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { UpdatedDebitCardAddress } from "@/store/slice/UserInfoSlice";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [buttonColor, setButtonColor] = useState("#66B18A");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Refs for text inputs to focus on the next one
  const aptInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const zipInputRef = useRef(null);

  useEffect(() => {
    if (address && apt && zipCode && city) {
      setButtonColor("#1D3B2F");
    } else {
      setButtonColor("#66B18A");
    }
  }, [address, apt, zipCode, city, state]);

  const handleContinue = () => {
    if (address && apt && zipCode && city) {
      setLoading(true);
      dispatch(UpdatedDebitCardAddress({ address, apt, zipCode, city, state }));
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("ThankyouScreen");
      }, 100);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
                      <StatusBar barStyle="light-content" />
      <PaperProvider theme={theme}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // This offset can help prevent the keyboard from briefly hiding and reappearing
        >
          <StatusBar barStyle="light-content" />
          <Header title="Add Address" />
          <Text style={styles.verifyText}>
            Enter your billing address information
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address</Text>
            <TouchableOpacity activeOpacity={1} onPress={() => aptInputRef.current.focus()}>
              <TextInput
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Street address. No PO boxes."
                placeholderTextColor="#7C7B7B"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                contentStyle={styles.inputContent}
                returnKeyType="next"
                selectionColor="#1D533C"
                theme={{
                  colors: {
                    primary: "#F2F2F2",
                  },
                }}
                onSubmitEditing={() => aptInputRef.current.focus()}
                blurOnSubmit={false} // Prevents keyboard from closing on "Next" press
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Apt / Ste</Text>
            <TouchableOpacity activeOpacity={1} onPress={() => aptInputRef.current.focus()}>
              <TextInput
                ref={aptInputRef}
                value={apt}
                onChangeText={(text) => setApt(text)}
                placeholder="Apt / Ste"
                placeholderTextColor="#7C7B7B"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                contentStyle={styles.inputContent}
                returnKeyType="next"
                selectionColor="#1D533C"
                theme={{
                  colors: {
                    primary: "#F2F2F2",
                  },
                }}
                onSubmitEditing={() => cityInputRef.current.focus()}
                blurOnSubmit={false} // Prevents keyboard from closing on "Next" press
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.inputLabel}>City</Text>
              <TouchableOpacity activeOpacity={1} onPress={() => cityInputRef.current.focus()}>
                <TextInput
                  ref={cityInputRef}
                  value={city}
                  onChangeText={(text) => setCity(text)}
                  placeholder="City"
                  placeholderTextColor="#7C7B7B"
                  mode="flat"
                  style={styles.input}
                  underlineColor="transparent"
                  contentStyle={styles.inputContent}
                  returnKeyType="next"
                  selectionColor="#1D533C"
                  theme={{
                    colors: {
                      primary: "#F2F2F2",
                    },
                  }}
                  onSubmitEditing={() => zipInputRef.current.focus()}
                  blurOnSubmit={false} // Prevents keyboard from closing on "Next" press
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.inputLabel}>Zip</Text>
              <TouchableOpacity activeOpacity={1} onPress={() => zipInputRef.current.focus()}>
                <TextInput
                  ref={zipInputRef}
                  value={zipCode}
                  onChangeText={(text) => setZipCode(text)}
                  placeholder="00000"
                  placeholderTextColor="#7C7B7B"
                  mode="flat"
                  style={styles.input}
                  underlineColor="transparent"
                  keyboardType="numeric"
                  maxLength={6}
                  returnKeyType="done"
                  selectionColor="#1D533C"
                  contentStyle={styles.inputContent}
                  theme={{
                    colors: {
                      primary: "#F2F2F2",
                    },
                  }}
                  onSubmitEditing={handleContinue}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Modal visible={loading} transparent={true}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </Modal>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.button, { backgroundColor: buttonColor }]}
            disabled={!address || !apt || !zipCode || !city}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </PaperProvider>
    </ScrollView>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F2F2F2",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  verifyText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginTop: 10,
    textAlign: "center",
    color: "#454955",
  },
  inputContainer: {
    paddingHorizontal: 15,
  },
  inputLabel: {
    fontFamily: "Poppins-Medium",
    color: "#1D533C",
    fontSize: 16,
    paddingBottom: 10,
    marginTop: 15
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    color: "#444444",
    height: 50, // Ensure enough height for easy touch
  },
  inputContent: {
    fontFamily: "Poppins-Medium",
    fontSize: 19,
    color: "#444444",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 0.5,
  },
  button: {
    paddingVertical: 17,
    borderRadius: 15,
    marginTop: 20,
    width: "92%",
    alignSelf: "center",
    position: "absolute",
    bottom: 94,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 21,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    justifyContent: "flex-start",
  },
});

export default AddressScreen;
