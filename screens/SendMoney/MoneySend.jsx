import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Pressable, KeyboardAvoidingView, Platform, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../constants/constants';
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { updatedUserInfo } from '@/store/slice/UserInfoSlice';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AdditionalScreen = () => {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const { firstName, lastName, phoneNumber, inputValue } = route.params || { firstName: '', lastName: '', phoneNumber: '', inputValue: 'not available' };
  
  const { firstLetter, lastLetter } = {
    firstLetter: firstName.charAt(0).toUpperCase(),
    lastLetter: lastName.charAt(0).toUpperCase()
  };

  const handleContinue = async () => {
    setError("");

    setTimeout(() => {
      navigation.navigate("TransferMoney", { phoneNumber: `${phoneNumber}`, firstName, lastName });
    }, 10);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <Text style={styles.headerText}>Money Sent</Text>
          </View>

          <Image source={require('./tick.png')} style={{alignSelf: 'center', textAlign: 'center', marginTop: 30}} />
          <Text style={styles.sendText}>Send to {firstName} {lastName}</Text>
          <View>
            <Text style={styles.enrolledText}>Enrolled as {firstName} {lastName}</Text>
            <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
            <Text style={{color: Colors.lightGreen, fontSize: 57, fontFamily: 'Poppins-Medium' , marginTop: 38, textAlign: 'center', marginBottom: 49}} >{inputValue}<Text style={{fontSize: 25}}>AED</Text> </Text>
           
            <Text style={{color:Colors.dark, fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center'}}>The money will be available in <Text style={{fontFamily: 'Poppins-SemiBold'}}>Lama Essam’s</Text>  account typically within minutes.</Text>
            
            <View style={{flexDirection: 'row', marginTop: 17, borderTopWidth: 1, borderBottomWidth: 1, gap: 20, marginTop: 20, borderColor: '#D7D7D7'}}>
            <Text style={{color:'#8D8D8D', fontFamily: 'Poppins-Medium', fontSize: 16, marginVertical: 20, textAlign: 'center'}}>CONFIRMATION </Text>
            <Text style={{color:Colors.dark, fontFamily: 'Poppins-Medium', fontSize: 16, marginVertical: 20, textAlign: 'center'}}>JPM99ak4h92y </Text>

            </View>
          </View>
        </View>
      </ScrollView>


      <View style={styles.buttonView}>
      <TouchableOpacity
  style={[styles.reviewButton,      { backgroundColor: '#1C533C'}]}
  onPress={() => navigation.navigate('Home')}
>
  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20, color: '#FFF' }}>Done</Text>
</TouchableOpacity>

      </View>

   
    </KeyboardAvoidingView>
  );
};

export default AdditionalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    padding: 20,
    paddingTop: 26
  },
  circle: {
    width: 71,
    height: 71,
    borderRadius: 35,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30
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
  reviewButton: {
    width: '100%',
    padding: 17,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelButton: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.dark,
  },
  phoneNumberText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    padding: 4,
    color: Colors.green,
  },
  text: {
    color: Colors.lightGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginTop: 11,
    marginBottom: 14
  },
  circleText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  headerText: {
    fontSize: 27,
    color: Colors.dark
  },
  sendText: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: Colors.dark,
    paddingTop: 15,
    textAlign: 'center',
  },
  enrolledText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    padding: 4,
    color: Colors.dark,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  buttonView: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    width: '90%',
    height: 50, // Adjust height as needed
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: Colors.dark,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.green,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
