import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import Header from '@/components/HeaderInnerApp';
import { Colors } from '../constants/constants';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const Profile = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("(55) 555-5555");
  const [email, setEmail] = useState("mubasharalee@gmail.com");
  const [homeAddress, setHomeAddress] = useState("Apartment 123, Building 45 Sheikh Zayed Road Downtown, Dubai, UAE");
  const [debitCard, setDebitCard] = useState("5252 5252 5252 5252"); // Full card number stored here
  const [isCardFocused, setIsCardFocused] = useState(false); // State to track if the card input is focused
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [avatarUri, setAvatarUri] = useState(null); // State to store the avatar image URI

  const dispatch = useDispatch();

  // Refs for input fields
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const homeAddressRef = useRef(null);
  const debitCardRef = useRef(null);
  const scrollViewRef = useRef(null);

  const scrollToInput = (ref) => {
    ref.current?.measureLayout(
      scrollViewRef.current?.getScrollResponder().getInnerViewNode(),
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y: y - 80, animated: true });
      }
    );
  };

  const getMaskedCardNumber = () => {
    return isCardFocused ? debitCard : `●●●● ●●●● ●●●● ${debitCard.slice(-4)}`;
  };

  const handleChoosePhoto = useCallback(async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri;
        setAvatarUri(selectedImage);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("ImagePicker Error: ", error);
    }
  }, []);

  const handleTakePhoto = useCallback(async () => {
    try {
      const result = await launchCamera({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri;
        setAvatarUri(selectedImage);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Camera Error: ", error);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header />
      <ScrollView
        style={{ paddingHorizontal: 20 }}
        ref={scrollViewRef}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.headerText}>Profile</Text>
        <View style={styles.profileContainer}>
          <ImageBackground 
            source={require('../../assets/images/gradient.png')} 
            style={styles.gradientContainer}
            resizeMode="cover"
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarText}>SM</Text>
                )}
                <TouchableOpacity
                  style={styles.avatarIcon}
                  onPress={() => setModalVisible(true)}
                >
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>Saleh Muhammad</Text>
            
            {/* Phone Number Input */}
            <View style={styles.infoBox}>
              <Text style={styles.labelText}>Registered Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <Image style={styles.prefixImgNumber} source={require('../../assets/images/uaeflag.png')} />
                <Text style={styles.prefixText}>+971</Text>
                <TextInput
                  placeholder="(00) 000-0000"
                  placeholderTextColor={Colors.greyLight}
                  style={[styles.textInputPrefix,{paddingLeft: 4}]}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="numeric"
                  maxLength={13}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  onSubmitEditing={() => emailRef.current.focus()}
                  ref={phoneNumberRef}
                  onFocus={() => scrollToInput(phoneNumberRef)}
                />
              </View>
            </View>
            
            {/* Email Input */}
            <View style={styles.infoBox}>
              <Text style={styles.labelText}>Registered Email Address</Text>
              <View style={styles.inputWrapper}>
                <Image style={[styles.prefixImg,{width: 34, height: 27.2, resizeMode :'contain'}]} source={require('../../assets/images/email.png')} />
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor={Colors.greyLight}
                  style={styles.textInputPrefix}
                  value={email}
                  onChangeText={setEmail}
                  maxLength={50}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => homeAddressRef.current.focus()}
                  ref={emailRef}
                  onFocus={() => scrollToInput(emailRef)}
                />
              </View>
            </View>
            
            {/* Home Address Input */}
            <View style={styles.infoBox}>
              <Text style={styles.labelText}>Registered Home Address</Text>
              <View style={styles.inputWrapper}>
                <Image style={[styles.prefixImg,{width: 28, height: 26.71, resizeMode :'contain', alignSelf: 'flex-start', marginTop: 17}]} source={require('../../assets/images/home.png')} />
                <TextInput
                  placeholder="Home Address"
                  placeholderTextColor={Colors.greyLight}
                  style={[styles.textInputPrefix,{fontSize: 15}]}
                  value={homeAddress}
                  onChangeText={setHomeAddress}
                  maxLength={100}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => debitCardRef.current.focus()}
                  ref={homeAddressRef}
                  onFocus={() => scrollToInput(homeAddressRef)}
                  multiline={true}
                />
              </View>
            </View>

            {/* Debit Card Input */}
            <View style={styles.infoBox}>
              <Text style={styles.labelText}>Registered Debit Card</Text>
              <View style={styles.inputWrapper}>
                <Image style={styles.prefixImgNumber} source={require('../../assets/images/mastercard.png')} />
                <TextInput
                  placeholder="Debit Card"
                  placeholderTextColor={Colors.greyLight}
                  style={styles.textInputPrefix}
                  value={getMaskedCardNumber()}
                  onChangeText={setDebitCard}
                  keyboardType="numeric"
                  maxLength={19} // Assuming card format: "**** **** **** ****"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  ref={debitCardRef}
                  multiline={true}
                  onFocus={() => {
                    setIsCardFocused(true);
                    scrollToInput(debitCardRef);
                  }}
                  onBlur={() => setIsCardFocused(false)} // Mask card number when input loses focus
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select One</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={32} color={Colors.dark} style={{ paddingRight: 20 }} />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto}>
                    <Image source={require('../../assets/images/photo.png')} style={{width: 20, height: 20, objectFit: 'contain'}} />
                    <Text style={styles.modalButtonText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={handleChoosePhoto}>
                    <Image source={require('../../assets/images/albums.png')} style={{width: 20, height: 20, objectFit: 'contain'}} />
                    <Text style={styles.modalButtonText}>Choose Photo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    color: Colors.dark,
    paddingTop: 26,
    paddingBottom: 30,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    overflow: 'hidden',
    paddingBottom: 80
  },
  gradientContainer: {
    width: '100%',
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  avatarText: {
    fontSize: 37.5,
    color: Colors.green,
    fontFamily: 'Poppins-Regular',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarIcon: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: Colors.green,
    borderRadius: 100,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    marginTop: 60,
    paddingHorizontal: 15,
  },
  nameText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: Colors.green,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  infoBox: {
  },
  labelText: {
    fontSize: 15,
    color: Colors.lightGreen,
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
    paddingTop: 15
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  textInputPrefix: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 20,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Medium',
    paddingVertical: 17,
    borderRadius: 10,
    color: Colors.dark,
  },
  prefixImg: {
    width: 34,
    marginLeft: 15,
  },
  prefixImgNumber: {
    width: 43,
    height: 27,
    marginLeft: 15,
  },
  prefixText: {
    color: '#1D533C',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    paddingLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: '30%',
    paddingVertical: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D7D7D7',
  },
  modalTitle: {
    fontSize: 27,
    color: Colors.dark,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  modalContent: {
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D7D7D7',
    paddingHorizontal: 20,
    paddingTop: 16
  },
  modalButtonText: {
    fontSize: 19,
    marginLeft: 15,
    color: Colors.lightGreen,
  },
});
