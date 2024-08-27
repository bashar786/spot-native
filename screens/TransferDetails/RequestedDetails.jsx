import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { Colors } from '@/screens/constants/constants';
import HeaderInnerApp from '@/components/HeaderInnerApp';
import TabNavigator from '../../screens/TabNavigator'

const { width } = Dimensions.get('window');
const isIPhone14Pro = width === 393; 
const isIPhone15ProMax = width === 430; 

const RequestDetailsScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const activity = useSelector(state => state.user.activities.find(item => item.id === id));

  if (!activity) {
    return (
      <View style={styles.container}>
        <Text>No details found</Text>
      </View>
    );
  }

  const { FirstName = '', LastName = '', amount = '' } = activity;
  const [amountValue, currencyCode] = amount.split(' ');
  const initials = `${FirstName.charAt(0) || ''}${LastName.charAt(0) || ''}`;
  const enrolledDetails = `Enrolled as ${FirstName} ${LastName}`;

  return (
    <View style={{ height: '100%' }}>
      <HeaderInnerApp />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={{alignSelf: 'flex-start', marginTop: 0, fontSize: 27, color: Colors.dark, paddingBottom: 96}}>Request Details</Text>
          <View style={styles.greyContainer}>
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{initials}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amountValue}>{amountValue}<Text style={styles.amountCurrency}>{currencyCode || 'AED'}</Text></Text>
            </View>
            <Text style={styles.sentToLabel}>Requested from</Text>
            <Text style={styles.sentToName}>{activity.FirstName} {activity.LastName}</Text>
            <Text style={styles.sentToNumber}>{activity.number}</Text>
            <Text style={styles.sentToStatus}>{activity.status}</Text>

            <View style={styles.additionalContent}>
              <Text style={styles.Label}>Requested on </Text>
              <Text style={styles.LabelDes}>{activity.date}</Text>
            </View>
            <View style={styles.additionalContent}>
              <Text style={styles.Label}>Enrolled as</Text>
              <Text style={styles.LabelDes}>{activity.FirstName} {activity.LastName}</Text>
            </View>
            <View style={styles.additionalContent}>
              <Text style={styles.Label}>Pay From</Text>
              <Text style={styles.LabelDes}>{activity.number}</Text>
            </View>
            <View style={styles.additionalContent}>
              <Text style={styles.Label}>Memo</Text>
              <Text style={styles.LabelDes}>{activity.memo}</Text>
            </View>
            <View style={styles.additionalContent}>
              <Text style={styles.Label}>Confirmation</Text>
              <Text style={styles.LabelDes}>{activity.confirmation}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    height: '83%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  greyContainer: {
    backgroundColor: Colors.grey,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
    position: 'relative',
    paddingTop: 30,
    borderRadius: 15,
    paddingBottom: 8,
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -66,
  },
  initialsText: {
    color: 'white',
    fontFamily: 'Raleway-Light',
    fontSize: 37.5,
  },
  amountContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'flex-end',
  },
  amountValue: {
    fontSize: 29,
    color: Colors.dark,
    fontFamily: 'Poppins-Medium',
  },
  amountCurrency: {
    fontSize: 18,
    color: Colors.dark,
    fontFamily: 'Poppins-Medium',
  },
  sentToLabel: {
    color: '#7A7878',
    fontFamily: 'Poppins-Medium',
  },
  sentToName: {
    color: Colors.dark,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    paddingTop: 2,
  },
  sentToNumber: {
    color: Colors.lightGreen,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    paddingTop: 2,
  },
  sentToStatus: {
    color: Colors.dark,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    paddingTop: 2,
  },
  additionalContent: {
    width: '100%',
    paddingTop: 4,
    alignItems: 'flex-start',
  },
  Label: {
    color: Colors.dark,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    paddingBottom: 2,
    paddingTop: 10,
  },
  LabelDes: {
    color: '#747171',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
});

export default RequestDetailsScreen;
