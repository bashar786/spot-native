import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../constants/constants';
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { updatedUserInfo } from '@/store/slice/UserInfoSlice';
import { useRoute } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AdditionalScreen = () => {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const [isChecked, setIsChecked] = useState(false);
  const { firstName, lastName, phoneNumber } = route.params || 'name undefined';

  useEffect(() => {
    setIsButtonEnabled(isChecked);
  }, [isChecked]);

  // Determine button color based on checkbox state
  const buttonColor = isChecked ? Colors.green : '#66B18A';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Text style={styles.headerText}>Double-check your Receipt</Text>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View>
          <Text style={styles.infoText}>You're sending money to</Text>
          <Text style={styles.boldText}>{firstName} {lastName}</Text>
          <Text style={[styles.infoText, { fontSize: 14  }]}>Enrolled as {firstName} {lastName}</Text>
          <Text style={styles.infoText}>using</Text>
          <Text style={[styles.boldText, { fontFamily: 'Poppins-SemiBold' }]}>{phoneNumber}</Text>
          <Text style={[styles.infoText, { fontSize: 12, paddingTop: 17 }]}>
            If this is correct, check the box to confirm, then tap <Text style={{fontFamily: 'Poppins-Bold'}}>Continue</Text>. Only use SPOT® to send money to people you know and trust.
          </Text>

          <Image source={require('./scams.png')} style={styles.image} />
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
              checkedColor="#1E3B2F"
              containerStyle={styles.checkbox}
              checkedIcon={
                <View style={styles.iconContainer}>
                  <Feather name="check-square" size={15} color="#1E3B2F" />
                </View>
              }
              uncheckedIcon={
                <View style={styles.iconContainer}>
                  <FontAwesome name="square-o" size={15} color="#1E3B2F" />
                </View>
              }
            />
            <Text style={styles.checkboxLabel}>
              I'm sure this isn't a scam, and I'd like to make this payment.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: buttonColor }]}
          disabled={!isButtonEnabled} // Enable button only if isButtonEnabled is true
          onPress={() => navigation.navigate('EnterAmount', { firstName, lastName, phoneNumber })}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdditionalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    paddingTop: 26,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  headerText: {
    fontSize: 27,
    marginBottom: 30,
    color: Colors.dark,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: Colors.dark,
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.dark,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginRight: 0, // Add margin between checkbox and label if needed
    marginLeft: -2,
    margin: 0,
  },
  checkboxLabel: {
    fontSize: 11.5,
    color: Colors.dark,
    fontFamily: 'Poppins-Regular',
    flex: 1,
    paddingLeft: 0, // Ensure no padding between checkbox and text
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.green,
    borderRadius: 13,
    padding: 15,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.green,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  continueButton: {
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    flex: 1,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
  iconContainer: {
    width: 24, // Same width for both icons
    height: 24, // Same height for both icons
    justifyContent: 'center',
    alignItems: 'center',
  },
});
