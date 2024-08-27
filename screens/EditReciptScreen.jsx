import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Colors } from './constants/constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import uaeflag from '../assets/images/uaeflag.png';
import { useDispatch } from 'react-redux';
import { addReceipt, updateReceipt } from '@/store/slice/UserInfoSlice';

const AdditionalScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  // Extract receipt data from route params
  const { phoneNumber: initialPhoneNumber, firstName: initialFirstName, lastName: initialLastName, id: receiptId } = route.params || {};
  const { firstLetter, lastLetter } = {
    firstLetter: initialFirstName?.charAt(0).toUpperCase() || "h",
    lastLetter: initialLastName?.charAt(0).toUpperCase() || "m"
  };
  


  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [fieldsUpdated, setFieldsUpdated] = useState(false);
  const phoneNumberRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const isPhoneNumberValid = phoneNumber.length === 13;
    const isFirstNameFilled = firstName.trim() !== "";
    const isLastNameFilled = lastName.trim() !== "";
    
    setIsButtonEnabled(isPhoneNumberValid && isFirstNameFilled && isLastNameFilled);
  }, [phoneNumber, firstName, lastName, initialPhoneNumber, initialFirstName, initialLastName]);
  
  useEffect(() => {
    // Update phone number format when it changes
    const formatted = phoneNumber.replace(/\D/g, "");
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
  }, [phoneNumber]);

  const handlePhoneNumberChange = (text) => {
    const formatted = text.replace(/\D/g, "");
    setPhoneNumber(formatted);
  };

  const handleContinue = async () => {
    Keyboard.dismiss();
    const isPhoneNumberValid = phoneNumber.length === 13;


    if (firstName.trim() === "" || lastName.trim() === "") {
      setError("Please enter both first and last names");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (receiptId) {
        // Update existing receipt
        dispatch(updateReceipt({ id: receiptId, firstName, lastName, phoneNumber: `+971 ${phoneNumber}` }));
        console.log('Receipt updated');
      } else {
        // Add new receipt
        dispatch(addReceipt({ firstName, lastName, phoneNumber: `+971 ${phoneNumber}` }));
        console.log('Receipt created');
      }
      navigation.navigate("Recipients", { phoneNumber: `+971 ${phoneNumber}`, firstName, lastName , success: true});
    }, 10);
  };

  const scrollToInput = (ref) => {
    ref.current?.measureLayout(
      scrollViewRef.current?.getScrollResponder().getInnerViewNode(),
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y: y - 80, animated: true });
      }
    );
  };
  const handleInputChange = (field, value) => {
    switch (field) {
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      default:
        break;
    }
    // Update fieldsUpdated state
    setFieldsUpdated(true);
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.headerText}>Edit Recipient</Text>
        </View>
        <View style={styles.circle}>
            <Text style={styles.circleText}>{firstLetter}{lastLetter}</Text>
          </View>
          <Text style={{fontSize: 17, fontFamily: 'Poppins-Medium', alignSelf: 'center', marginTop: 10 }}>{firstName} {lastName}</Text>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          placeholder="First Name"
          placeholderTextColor={Colors.greyLight}
          style={styles.textInput}
          value={firstName}
          onChangeText={setFirstName}
          returnKeyType="next"
          onSubmitEditing={() => {
            scrollToInput(lastNameRef);
            lastNameRef.current.focus();
          }}
          ref={firstNameRef}
          maxLength={12}
        />
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor={Colors.greyLight}
          style={styles.textInput}
          value={lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
          returnKeyType="done"
          ref={lastNameRef}
          maxLength={12}
        />
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
        <Text style={styles.errorText}>{error}</Text>
        
   
      </ScrollView>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.cancelButton} onPress={()=> navigation.goBack()}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: Colors.green }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.reviewButton,
            { backgroundColor: fieldsUpdated ? Colors.lightGreen : '#66B18A' }
          ]}
            onPress={handleContinue}
        >
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#FFF' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: Colors.dark,
  },
  cancelButton: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.dark,
    marginBottom: 10
  },
  reviewButton: {
    width: '48%',
    padding: 17,
    borderRadius: 13,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: Colors.lightGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginTop: 11,
    marginBottom: 14
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
    paddingHorizontal: 0,
    backgroundColor: '#F2F2F2',
    fontFamily: 'Poppins-Medium',
    padding: 12,
    borderRadius: 10,
    color: Colors.dark,
    paddingLeft: 15,
  },
  circleText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Raleway-Light',
  },
  errorText: {
    color: Colors.red,
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

});

export default AdditionalScreen;
