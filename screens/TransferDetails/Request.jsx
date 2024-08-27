import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../constants/constants';
import { useNavigation } from 'expo-router';
import { Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const ActivitiesScreen = () => {
  const activities = useSelector(state => state.user.activities);
  const navigation = useNavigation();
  const [canceledRequests, setCanceledRequests] = useState(new Set());
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Filter activities to include only those with type 'requested'
  const requestedActivities = activities.filter(activity => activity.type === 'requested');

  const handleCancel = (item) => {
    // Show the confirmation dialog
    Alert.alert(
      "Cancel Request",
      `Are you sure you want to cancel the request to send ${item.amount} ${item.FirstName || 'Unknown'}?`,
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", 
          onPress: () => {
            // Handle the cancellation logic here
            setCanceledRequests(prev => new Set(prev.add(item.id)));
            setSnackbarVisible(true);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => {
    const firstNameInitial = item.FirstName ? item.FirstName.charAt(0) : '?';
    const isCanceled = canceledRequests.has(item.id);

    return (
      <TouchableOpacity
        style={{ paddingLeft: 2, paddingRight: 6 }}
        onPress={() => navigation.navigate('RequestedDetails', { id: item.id })}
      >
        <Text style={styles.date}>{item.date || 'No date'}</Text>

        <View style={styles.item}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstNameInitial}</Text>
          </View>
          <View style={[styles.details, { paddingHorizontal: 10 }]}>
            <Text style={styles.name}>{item.FirstName || 'Unknown'}</Text>
            <Text style={styles.enrolledAs}>{item.details || 'No details available'} Random</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.amount}>{item.amount}<Text style={{ fontSize: 13 }}> AED</Text></Text>
            <Text style={styles.time}>{isCanceled ? 'Canceled' : item.time || 'N/A'}</Text>
          </View>
         
        </View>
        {!isCanceled && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(item)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={requestedActivities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={5000}
        style={styles.snackbar}
      >
        <View style={styles.snackbarContent}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="done-outline" size={22} color="black" />
            <Text style={styles.snackbarText}>Request Canceled</Text>
          </View>
          <TouchableOpacity onPress={() => setSnackbarVisible(false)}>
            <Image source={require('../../assets/images/cancel.png')} style={styles.cancelImg} />
          </TouchableOpacity>
        </View>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
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
    paddingBottom: 4,
  },
  enrolledAs: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Raleway-Medium',
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
    alignSelf: 'flex-end',
  },
  date: {
    fontFamily: 'Poppins-Medium',
    color: Colors.green,
    fontSize: 16,
  },
  timeContainer: {
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    textAlign: 'left',
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ADF1CE',
    elevation: 8, // Android shadow
    shadowColor: '#333', // iOS shadow
    shadowOffset: { width: 2, height: 2 }, // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 3.84, // iOS shadow,
    left: -8,
    borderRadius: 12,
    paddingVertical: 4
  },
  snackbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  snackbarText: {
    marginLeft: 10,
    color: Colors.green,
    fontFamily: 'Poppins-Medium',
  },
  cancelImg: {
    width: 12,
    height: 12,
  },
  cancelButton: {
    backgroundColor: Colors.green,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 3
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default ActivitiesScreen;
