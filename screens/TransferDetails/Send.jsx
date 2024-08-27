import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../constants/constants';
import { useNavigation } from 'expo-router';
import Header from '@/components/HeaderInnerApp';

const ActivitiesScreen = () => {
  const activities = useSelector(state => state.user.activities);
  const navigation = useNavigation();
  
  // Filter activities to include only those with type 'send'
  const sendActivities = activities.filter(activity => activity.type === 'send');
  
  const renderItem = ({ item }) => {
    // Ensure FirstName is defined and is a string
    const firstNameInitial = item.FirstName ? item.FirstName.charAt(0) : '?';

    return (
      <TouchableOpacity style={{    paddingLeft: 2, paddingRight: 6}} onPress={() => navigation.navigate('PaymentDetails', { id: item.id })}>
        <Text style={styles.date}>{item.date || 'No date'}</Text>

        <View style={styles.item}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstNameInitial}</Text>
          </View>
          <View style={[styles.details,{paddingHorizontal: 10}]}>
            <Text style={styles.name}>{item.FirstName || 'Unknown'}</Text>
            <Text style={styles.enrolledAs}>{item.details || 'No details available'}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.amount}>{item.amount}<Text style={{fontSize: 13}}> AED</Text></Text>
            <Text style={styles.time}>{item.time || 'N/A'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sendActivities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure id is converted to string
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical:18,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Raleway-Regular',
    
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
    fontFamily: 'Raleway-Bold',
    paddingBottom: 5
  },
  enrolledAs: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Raleway-Medium'
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.green,
    fontFamily: 'Poppins-Medium',
  },
  time: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
    alignSelf: 'flex-end'
  },
  date:{
    fontFamily: 'Poppins-Medium',
    color: Colors.green,
    fontSize: 16
  },
  timeContainer: {
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    textAlign: 'left'
  }
});

export default ActivitiesScreen;
