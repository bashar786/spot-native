import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { Colors } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

// Separate ListHeader component
const ListHeader = ({ searchQuery, setSearchQuery, navigation }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      <Text style={styles.headerText}>Search Recipient</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={30} color={Colors.dark} />
      </TouchableOpacity>
    </View>
    <Text style={styles.subHeaderText}>Search Name or Mobile Number</Text>
    <TextInput
      style={styles.searchInput}
      placeholder="Search Name or Mobile Number"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
    {searchQuery.length === 0 && (
      <Text style={styles.recentHeader}>All Receipts</Text>
    )}
  </View>
);

const AdditionalScreen = () => {
  const navigation = useNavigation();
  const receipts = useSelector((state) => state.user.receipts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReceipts = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return receipts.filter(({ firstName, lastName, phoneNumber }) => {
      return (
        firstName.toLowerCase().includes(lowerQuery) ||
        lastName.toLowerCase().includes(lowerQuery) ||
        phoneNumber.includes(lowerQuery)
      );
    });
  }, [searchQuery, receipts]);

  const handleDetails = useCallback((firstName, lastName, phoneNumber) => {
    navigation.navigate("DoubleCheckReciept", { firstName, lastName, phoneNumber });
  }, [navigation]);

  const renderReceipt = useCallback(({ item }) => {
    const { firstName, lastName, phoneNumber } = item;
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

    return (
      <TouchableOpacity style={styles.receiptContainer} onPress={() => handleDetails(firstName, lastName, phoneNumber)}>
        <View style={styles.receiptCircle}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.nameText}>{firstName} {lastName}</Text>
          <Text style={styles.phoneText}>{phoneNumber}</Text>
        </View>
      </TouchableOpacity>
    );
  }, [handleDetails]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredReceipts}
        renderItem={renderReceipt}
        keyExtractor={(item) => item.phoneNumber}
        ListHeaderComponent={<ListHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} navigation={navigation} />}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={() => (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No Search Results</Text>
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => navigation.navigate('AddReciept')}>
                <Text style={styles.addText}>Add {searchQuery}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    color: Colors.dark,
    marginBottom: 40
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.green,
    paddingBottom: 10,
  },
  searchInput: {
    fontSize: 17,
    backgroundColor: '#F2F2F2',
    fontFamily: 'Poppins-Medium',
    padding: 12,
    borderRadius: 10,
    color: Colors.dark,
    paddingLeft: 15,
    marginBottom: 16,
  },
  recentHeader: {
    marginTop: 20,
    fontSize: 17,
    color: Colors.green,
    fontFamily: 'Poppins-SemiBold',
  },
  flatListContent: {
    paddingBottom: 80,
  },
  receiptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    paddingVertical: 15,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#D7D7D7',
    borderWidth: 1,
  },
  receiptCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initials: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
    fontFamily: 'Raleway-Bold',
  },
  phoneText: {
    fontSize: 14,
    color: '#646464',
    fontFamily: 'Poppins-Medium',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 19,
    color: Colors.dark,
  },
  addText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.green,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default AdditionalScreen;
