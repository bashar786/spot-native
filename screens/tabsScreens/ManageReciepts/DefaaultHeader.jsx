// ./DefaultHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '@/screens/constants/constants';

const DefaultHeader = ({ setIsSearching, navigation }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Select Recipient</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonLeft} onPress={() => setIsSearching(true)}>
        <AntDesign name="search1" size={30} color={Colors.green} />
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRight} onPress={() => navigation.navigate('RequestAddReciept')}>
        <Entypo name="plus" size={38} color={Colors.green} />
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.receiptsHeader}>All Recipients</Text>
  </View>
);

export default DefaultHeader;
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
      buttonLeft: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonRight: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 16,
        marginLeft: 5,
        color: Colors.green,
      },
      receiptsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark,
        marginVertical: 10,
      },
  
  })