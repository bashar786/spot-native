import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../constants/constants';
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const AdditionalScreen = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("0");
  const dispatch = useDispatch();
  const limit = '10,000.00 AED';
  const route = useRoute();
  const { firstName, lastName, phoneNumber } = route.params || { firstName: '', lastName: '', phoneNumber: '' };
  const { firstLetter, lastLetter } = {
    firstLetter: firstName.charAt(0).toUpperCase(),
    lastLetter: lastName.charAt(0).toUpperCase()
  };

  
  const handleContinue = () => {
    let finalValue = inputValue;

    // Check if the value contains a decimal point
    if (!finalValue.includes('.')) {
      finalValue = `${finalValue}.00`; // Append .00 if no decimal point is present
    }

    navigation.navigate("ReviewAndSend", { phoneNumber: `${phoneNumber}`, firstName, lastName, inputValue: finalValue });
  };



  const handleButtonPress = (value) => {
    if (value === '<') {
      setInputValue(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else if (inputValue.length < 5) { // Check for max length
      setInputValue(prev => {
        const cleanValue = prev === "0" ? "" : prev;
        return `${cleanValue}${value === '•' ? '.' : value}`;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Enter Amount</Text>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{firstLetter}{lastLetter}</Text>
        </View>
        <Text style={styles.sendText}>Send to {firstName} {lastName}</Text>
        <Text style={styles.enrolledText}>Enrolled as {firstName} {lastName}</Text>
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
      </View>

      <View style={styles.calculator}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{inputValue}<Text style={styles.aedText}>AED</Text></Text>
        </View>
        <Text style={styles.limitText}>Your remaining daily send limit is <Text style={styles.limitBold}>{limit}</Text></Text>
        <View style={styles.numberPad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '•', '0', '<'].map((value, index) => (
            <TouchableOpacity
              key={index}
              style={styles.calculatorButton}
              onPress={() => handleButtonPress(value)}
            >
              {value === '<' ? (
                <Image
                  source={require('../../assets/images/Union.png')} // Replace with your actual backspace icon path
                  style={styles.backspaceIcon}
                />
              ) : (
                <Text style={styles.calculatorButtonText}>{value}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.reviewButton,
              { backgroundColor: parseFloat(inputValue) >= 1 ? '#1C533C' : '#66B18A' }
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.reviewButtonText}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  logo: {
    height: 40,
    width: 120,
  },
  logoutButton: {
    padding: 10,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  content: {
    paddingTop: 26,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  circle: {
    width: 71,
    height: 71,
    borderRadius: 50,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  circleText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Raleway-Light',
  },
  headerText: {
    fontSize: 27,
    color: Colors.dark,
    alignSelf: 'flex-start',
    fontWeight: '400'
  },
  sendText: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: Colors.dark,
    textAlign: 'center',
  },
  enrolledText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#646464',
    textAlign: 'center',
    paddingTop: 3,
    paddingBottom: 1
  },
  phoneNumberText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.lightGreen,
    textAlign: 'center',
    marginBottom: 18
  },
  calculator: {
    backgroundColor: Colors.green,
    paddingVertical: 0,
    alignItems: 'center',
    height: '100%',
    padding: 0,
    paddingTop: 10
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  inputText: {
    fontSize: 57,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  aedText: {
    fontSize: 27,
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
  },
  limitText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingBottom: 18,
  },
  limitBold: {
    fontFamily: 'Poppins-Bold',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  calculatorButton: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15
  },
  calculatorButtonText: {
    fontSize: 23,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  backspaceIcon: {
    width: 28,
    height: 20,
    tintColor: 'white',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingTop: 20
  },
  cancelButton: {
    width: '47%',
    backgroundColor: '#FFF',
    padding: 17,
    borderRadius: 13,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.green,
  },
  reviewButton: {
    width: '47%',
    padding: 17,
    borderRadius: 13,
    alignItems: 'center',
  },
  reviewButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default AdditionalScreen;
