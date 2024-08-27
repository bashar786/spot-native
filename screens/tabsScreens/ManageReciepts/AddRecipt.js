import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Colors } from '../../constants/constants';
import { useNavigation } from 'expo-router';
import uaeflag from '../../../assets/images/uaeflag.png';
import { useDispatch } from 'react-redux';
import { addReceipt } from '@/store/slice/UserInfoSlice';
import { useRoute } from '@react-navigation/native';
import { updatedUserInfo } from '@/store/slice/UserInfoSlice';

const AdditionalScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const { name } = route.params || { name: 'name undefined' };

  // Refs for input fields
  const phoneNumberRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const scrollViewRef = useRef(null); // Ref for the ScrollView

  useEffect(() => {
    const isPhoneNumberValid = phoneNumber.length === 13;
    const isFirstNameFilled = firstName.trim() !== "";
    const isLastNameFilled = lastName.trim() !== "";

    setIsButtonEnabled(isPhoneNumberValid && isFirstNameFilled && isLastNameFilled);
  }, [phoneNumber, firstName, lastName]);

  const handlePhoneNumberChange = (text) => {
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

  const handleContinue = async () => {
    Keyboard.dismiss();
    const isPhoneNumberValid = phoneNumber.length === 13;

    if (!isPhoneNumberValid) {
      setError("Please enter a valid phone number");
      return;
    }

    if (firstName.trim() === "" || lastName.trim() === "") {
      setError("Please enter both first and last names");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(addReceipt({ firstName, lastName, phoneNumber: `+971 ${phoneNumber}` }));
      console.log('Receipt created');

      navigation.navigate("Recipients", { phoneNumber: `+971 ${phoneNumber}`, firstName, lastName });
    }, 10);
  };

  const scrollToInput = (ref) => {
    ref.current?.measureLayout(
      scrollViewRef.current?.getScrollResponder().getInnerViewNode(),
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y: y - 80, animated: true }); // Increased offset value to 80
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        ref={scrollViewRef} // Set the ref for ScrollView
        style={styles.content}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.headerText}>Add Receipt</Text>
        </View>
        <Text style={styles.text}>Receipt UAE Mobile Number</Text>
        <View style={styles.inputWrapper}>
          <View style={styles.prefixDiv}>
            <Image source={uaeflag} style={styles.prefixImg} />
            <Text style={styles.prefixText}>+971</Text>
          </View>

          <TextInput
            placeholder="(00) 000-0000"
            placeholderTextColor={Colors.greyLight}
            style={styles.textInputPrefix}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
            maxLength={13}
            returnKeyType="done"
            blurOnSubmit={false}  // Keep the keyboard open
            onSubmitEditing={() => firstNameRef.current.focus()} // Focus on next input
            ref={phoneNumberRef}
            onFocus={() => scrollToInput(phoneNumberRef)} // Scroll to the input on focus
          />
        </View>
        <Text style={styles.noteText}>Enter UAE Mobile Number</Text>
        <Text style={[styles.text,{marginTop: 15}]}>First Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor={Colors.greyLight}
            style={styles.textInput}
            value={firstName}
            onChangeText={setFirstName}
            maxLength={12}
            returnKeyType="next"
            blurOnSubmit={false}  // Keep the keyboard open
            onSubmitEditing={() => lastNameRef.current.focus()} // Focus on next input
            ref={firstNameRef}
            onFocus={() => scrollToInput(firstNameRef)} // Scroll to the input on focus
          />
        </View>

        <Text style={[styles.text,{marginTop: 15}]}>Last Name <Text style={styles.optionalText}>(optional)</Text></Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={Colors.greyLight}
            style={styles.textInput}
            value={lastName}
            onChangeText={setLastName}
            maxLength={12}
            returnKeyType="done"
            blurOnSubmit={true}  // Close the keyboard after this field
            onSubmitEditing={Keyboard.dismiss}  // Dismiss the keyboard when done
            ref={lastNameRef}
            onFocus={() => scrollToInput(lastNameRef)} // Scroll to the input on focus
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Text style={styles.contactsText}>Select receipt from contacts</Text>
        {isButtonEnabled && (
          <View>
            <Text style={styles.receiptInfoText}>
              <Text style={styles.boldText}>{firstName} {lastName}</Text> must be enrolled with SPOT® using <Text style={styles.boldText}>+971 {phoneNumber}</Text> 
            </Text>
            <Text style={styles.termsText}>
              By adding this recipient, you agree to receive text messages about your SPOT® activity. Message and data rates may apply.
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isButtonEnabled ? Colors.green : '#66B18A' }]}
        onPress={handleContinue}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AdditionalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  headerText: {
    fontSize: 27,
    fontWeight: '400',
    color: Colors.dark,
    paddingTop: 2
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.lightGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 10
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: '#F2F2F2',
    borderRadius: 16
  },
  prefixDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  prefixImg: {
    width: 46,
    height: 31,
  },
  prefixText: {
    color: '#1D533C',
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 15,
    fontFamily: 'Poppins-SemiBold'
  },
  textInputPrefix: {
    flex: 1,
    fontSize: 18,
    backgroundColor: '#F2F2F2',
    fontFamily: 'Poppins-Medium',
    padding: 5,
    paddingVertical: 16,
    borderRadius: 10,
    color: Colors.dark,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F2',
    fontFamily: 'Poppins-Medium',
    padding: 16,
    borderRadius: 10,
    color: Colors.dark,
  },
  noteText: {
    color: Colors.greyLight,
    fontSize: 11,
    marginTop: 10,
    fontFamily: 'Poppins-Medium'
  },
  optionalText: {
    color: Colors.greyLight,
    fontSize: 11,
  },
  contactsText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.green,
    paddingTop: 24,
  },
  receiptInfoText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    padding: 4,
    color: Colors.dark,
    paddingTop: 20,
    lineHeight: 21
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
  },
  termsText: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
    paddingTop: 15
  },
  trustText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: '#444444',
    paddingTop: 15

  },
  button: {
    padding: 17,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 23,
    width: '99%',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
});
