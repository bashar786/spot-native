import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/constants'; // Ensure Colors is correctly imported
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from 'expo-router';

const AdditionalScreen = () => {
  const navigation = useNavigation();
  const name = 'Gad Revah'; // Hardcoded for simplicity

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.headerText}>Select Contact Method</Text>
        <Feather name="x" size={30} color='black' style={styles.closeIcon} />
      </View>

      <Text style={styles.infoText}>
        Which U.A.E mobile number would you like to use for{' '}
        <Text style={{fontFamily: 'Poppins-SemiBold'}}>{name}</Text>?
      </Text>
      
      <TouchableOpacity 
        style={styles.phoneNumberContainer} 
        onPress={() => navigation.navigate('AddReciept', { name })}>
        <Text style={styles.phoneNumberText}>+971 (55) 777-7777</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.phoneNumberContainer} 
        onPress={() => navigation.navigate('AddReciept', { name })}>
        <Text style={styles.phoneNumberText}>+971 (55) 777-7777</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AdditionalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full available space
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 30,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeIcon: {
    marginBottom: 5,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginVertical: 20,
    color: Colors.dark, // Ensure Colors.dark is defined
  },
  phoneNumberContainer: {
    borderBottomWidth: 2, // Apply border to the container instead of individual text
    borderBottomColor: '#D7D7D7',
    paddingBottom: 4,
  },
  phoneNumberText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.lightGreen, // Ensure Colors.lightGreen is defined
    paddingVertical: 15,
  },
});
