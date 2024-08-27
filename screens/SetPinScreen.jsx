import React, { useRef, useState, useEffect } from "react";
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
  ScrollView,
  Dimensions,
  Keyboard,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get('window');
const isIPhone14Pro = width === 393; 
const isIPhone15ProMax = width === 430; 

const SetPinScreen = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();

  const pinInput = useRef(null);
  const confirmPinInput = useRef(null);

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

  const handleContinue = async () => {
    if (pin.trim() === "" || confirmPin.trim() === "") {
      setError("Please enter and confirm your PIN.");
      return;
    }
    if (pin !== confirmPin) {
      setError("PINs do not match. Please try again.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      navigation.navigate("DebitcardScreen");
    } catch (error) {
      console.error("Error setting PIN:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePinSubmit = () => {
    if (pin.length === 6) {
      confirmPinInput.current.focus();
    }
  };

  const handleRevealPin = () => {
    setShowPin(!showPin);
  };

  const handleRevealConfirmPin = () => {
    setShowConfirmPin(!showConfirmPin);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather 
            name="arrow-left"
            onPress={() => navigation.navigate('EmailScreen')}
            size={30}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.headerText}>Set Your 6-Digit PIN</Text>
        </View>
        <StatusBar barStyle="light-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          style={styles.innerContent}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>PIN</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconContainer}>
                <Image source={require('../assets/images/key.png')} style={styles.prefixImg} />
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={pinInput}
                  value={pin}
                  onChangeText={(text) => {
                    setPin(text);
                    if (text.length === 6) {
                      handlePinSubmit();
                    }
                  }}
                  style={styles.textInput}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="PIN"
                  secureTextEntry={!showPin}
                  placeholderTextColor="#8D8D8D"
                  selectionColor="#1D533C"
                  returnKeyType="done"
                  onSubmitEditing={handlePinSubmit}
                  blurOnSubmit={false}
                />
              </View>
              <TouchableOpacity
                onPress={handleRevealPin}
                style={styles.eyeIconContainer}
              >
                <Icon name={showPin ? "visibility" : "visibility-off"} size={24} color="#1D533C" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.label}>Confirm PIN</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconContainer}>
                <Image source={require('../assets/images/key.png')} style={styles.prefixImg} />
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={confirmPinInput}
                  value={confirmPin}
                  onChangeText={setConfirmPin}
                  style={styles.textInput}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="Confirm PIN"
                  secureTextEntry={!showConfirmPin}
                  placeholderTextColor="#8D8D8D"
                  editable={pin.length === 6}
                  returnKeyType="done"
                  selectionColor="#1D533C"
                />
              </View>
              <TouchableOpacity
                onPress={handleRevealConfirmPin}
                style={styles.eyeIconContainer}
              >
                <Icon name={showConfirmPin ? "visibility" : "visibility-off"} size={24} color="#1D533C" />
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={handleContinue}
          style={[
            styles.continueButton,
            pin && confirmPin && pin === confirmPin
              ? { backgroundColor: "#1D3B2F" }
              : { backgroundColor: "#66B18A" },
          ]}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        {loading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#1D533C',
    fontFamily: 'Poppins-Medium',
    marginTop: 15
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 17
  },
  iconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    width: '70%',
    justifyContent: 'center',
  },
  eyeIconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'transparent',
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    color: '#444444'
  },
  continueButton: {
    padding: 16,
    borderRadius: 16,
    width: "92%",
    alignItems: "center",
    marginBottom: 94,
    alignSelf: 'center',
  },
  continueButtonText: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: '#1D3B2F',
    height: 115,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: 2,
    bottom: 4,
    color: '#FFFFFF',
    padding: 20
  },
  headerText: {
    color: '#fff',
    fontSize: 21,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '650'
  },
});

export default SetPinScreen;
