import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Colors } from '../constants/constants';
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addActivity } from '@/store/slice/UserInfoSlice'; // Import addActivity
import { useRoute } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const AdditionalScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const [error, setError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [LastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { firstName, lastName, phoneNumber, inputValue } = route.params || { firstName: '', lastName: '', phoneNumber: '' };

  const { firstLetter, lastLetter } = {
    firstLetter: firstName.charAt(0).toUpperCase(),
    lastLetter: lastName.charAt(0).toUpperCase()
  };

  const handleContinue = async () => {
    setError("");

    // Dispatch the addActivity action
    dispatch(addActivity({
      type: 'requested', // You can customize this type
      amount: `${inputValue} AED`,
      recipient: `${firstName} ${lastName}`,
      FirstName: firstName,
      LastName: lastName,
      number: phoneNumber,
      memo: LastName, // Memo from the input
      details: `Enrolled as ${firstName} ${lastName}`
    }));

    setTimeout(() => {
      navigation.navigate("RequestMoneySend", { phoneNumber: `${phoneNumber}`, firstName, lastName, inputValue });
    }, 10);
  };

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Review & Request</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-end', paddingRight: 20, gap: 6}}>
          <MaterialCommunityIcons name="pencil" size={22} color={Colors.green} />
            <Text style={{fontSize: 19, color: Colors.green, marginTop: 6}}>Edit</Text>
          </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{firstLetter}{lastLetter}</Text>
          </View>
          <Text style={styles.sendText}>Request From {firstName} {lastName}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.enrolledText}>Enrolled as {firstName} {lastName}</Text>
            <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
            <Text style={styles.amountText}>{inputValue}<Text style={styles.currencyText}>AED</Text></Text>
            <Text style={styles.text}>Memo <Text style={styles.optionalText}>(optional)</Text></Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Add a Memo"
                placeholderTextColor={Colors.greyLight}
                style={styles.textInput}
                value={LastName}
                onChangeText={setLastName}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={50}
                returnKeyType="done"

              />
            </View>
            <Text style={styles.infoText}>To request this money, your recipient must enroll with SPOT®. This request expires in 14 days.</Text>
            <Text style={styles.infoText}>Make sure all information is correct.</Text>
           
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.reviewButton,
            { backgroundColor: inputValue >= 1 ? '#1C533C' : '#66B18A' }
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.reviewButtonText}>Request</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>About This Payment</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={30} color={Colors.dark} />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>To receive this money, your recipient must enroll with SPOT® within 14 days, or the funds will be deposited back into your account.</Text>
              <Text style={styles.modalText}>If this payment is from a checking or savings account and there is not enough money on the transfer date, we may complete the transaction by creating an overdraft on the account (overdraft fees may apply). If this payment is from a checking account with Overdraft Protection, we may complete the transaction using available Overdraft Protection funds (fees may apply).</Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  headerText: {
    fontSize: 27,
    fontWeight: '400',
    color: Colors.dark,
  },
  content: {
    padding:20,
  },
  circle: {
    width: 71,
    height: 71,
    borderRadius: 35,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 0,
    paddingTop: 0
  },
  circleText: {
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'Raleway-Light',
  },
  sendText: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 3,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  enrolledText: {
    fontSize: 14,
    color: '#646464',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  phoneNumberText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    paddingTop: 3,
    color: Colors.green,
    marginBottom: 27,
  },
  amountText: {
    color: Colors.lightGreen,
    fontSize: 57,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  currencyText: {
    fontSize: 27,
  },
  text: {
    color: Colors.lightGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 14,
    alignSelf: 'flex-start'
  },
  optionalText: {
    color: Colors.greyLight,
    fontSize: 12,
  },
  textInput: {
    fontSize: 17,
    backgroundColor: '#F2F2F2',
    fontFamily: 'Poppins-Medium',
    padding: 12,
    borderRadius: 10,
    color: Colors.dark,
    width: '100%',
    paddingLeft: 15,
  },
  infoText: {
    color: Colors.dark,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 4,
  },
  aboutPaymentText: {
    fontSize: 13.5,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 6,
    color: Colors.green,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cancelButton: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.dark,
    marginBottom: 10,
  },
  cancelButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.green,
  },
  reviewButton: {
    width: '48%',
    padding: 17,
    borderRadius: 13,
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingBottom: 38
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: '#D7D7D7',
    borderBottomWidth: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 26,
    color: Colors.dark,
   
  },
  modalText: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.dark,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 28,
    width: '100%',
  },
});
