import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View , Dimensions} from 'react-native';
import { Colors } from '@/screens/constants/constants';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
const { width } = Dimensions.get('window');
const isIPhone14Pro = width === 393; 
const isIPhone15ProMax = width === 430; 

// Function to get initials
const getInitials = (firstName, lastName) => {
  const firstInitial = firstName ? firstName[0].toUpperCase() : '';
  const lastInitial = lastName ? lastName[0].toUpperCase() : '';
  return `${firstInitial}${lastInitial}`;
};

const QrCode = () => {
  const firstName = useSelector((state) => state.user.DebitCardInfo.FirstName);
  const lastName = useSelector((state) => state.user.DebitCardInfo.LastName);
  const number = useSelector((state) => state.user.DebitCardInfo.number);

  // Your details to encode in the QR code
  const myDetails = {
    firstName,
    lastName,
    number,
  };

  // Convert your details to a JSON string
  const data = JSON.stringify(myDetails);

  // Get initials
  const initials = getInitials(firstName, lastName);

  return (
    <View style={styles.container}>
      <View style={styles.greyContainer}>
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>SM</Text>
        </View>
        <Text style={styles.nameText}>Saleh Muhammad</Text>
        <Text style={styles.numberText}>+971 (55) 555-5555</Text>
        <View style={styles.qrCodeContainer}>
          <QRCode value={data} size={190} />
        </View>
        <Text style={styles.infoText}>This QR code will remain valid as long as the mobile remains enrolled in SPOT®.</Text>
      </View>
    </View>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyContainer: {
    backgroundColor: Colors.grey,
    width: '90%',
    color: 'black',
    alignItems: 'center',
    padding: 12,
    position: 'relative',
    marginVertical: 31,
    paddingVertical: 0,
    borderRadius: 15,
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -50,
  },
  initialsText: {
    color: 'white',
    fontFamily: 'Raleway-Light',
    fontSize: 37.5,
  },
  nameText: {
    fontSize: 24,
    color: Colors.dark,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 61,
  },
  numberText: {
    fontSize:  18,
    color: Colors.lightGreen,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 1,
  },
  qrCodeContainer: {
    marginTop: 15,
  },
  infoText: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    fontSize:  14,
    color: Colors.dark,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});
