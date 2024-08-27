import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { Colors } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

// Separate ListHeader component for Search functionality
const SearchHeader = ({ searchQuery, setSearchQuery, onCloseSearch }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      <Text style={styles.headerText}>Search Recipient</Text>
      <TouchableOpacity onPress={onCloseSearch}>
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
  const [isSearching, setIsSearching] = useState(false);

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
    navigation.navigate("EnterAmount", { firstName, lastName, phoneNumber });
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

  // ListHeader component for default view
  const DefaultHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Select Recipient</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonLeft} onPress={() => setIsSearching(true)}>
          <AntDesign name="search1" size={30} color={Colors.green} />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRight} onPress={() => navigation.navigate('AddReciept')}>
          <Entypo name="plus" size={38} color={Colors.green} />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.receiptsHeader}>Addded Recipients</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={isSearching ? filteredReceipts : receipts}
        renderItem={renderReceipt}
        keyExtractor={(item) => item.phoneNumber}
        ListHeaderComponent={
          isSearching ? (
            <SearchHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCloseSearch={() => setIsSearching(false)}
            />
          ) : (
            <DefaultHeader />
          )
        }
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
      {!isSearching && (
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SelectPaymentMethod')}>
            <Text style={styles.footerButtonText}>Access Contacts</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AdditionalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingTop: 30,
    paddingHorizontal: 20
  },
  headerText: {
    fontSize: 27,
    color: Colors.dark,
    fontWeight: "400",
    paddingBottom: 0
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.lightGreen,
    paddingTop: 30,
    paddingBottom: 10
  },
  searchInput: {
    fontSize: 17,
    backgroundColor: '#F2F2F2',
    fontFamily: 'Poppins-Medium',
    padding: 12,
    borderRadius: 10,
    color: Colors.dark,
    paddingLeft: 15,
  },
  recentHeader: {
    fontSize: 17,
    color: Colors.green,
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 20,
    paddingBottom: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    height: 96,
    borderRadius: 10,
    zIndex: 1,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  buttonLeft: {
    backgroundColor: '#fff',
    gap: 5,
   width: '50%',
   justifyContent: 'center',
   alignItems: 'center',
   height: '100%',
  borderTopLeftRadius: 9,
  borderBottomLeftRadius: 9

  },
  buttonRight: {
    backgroundColor: '#fff',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
   borderTopRightRadius: 9,
   borderBottomRightRadius: 9,
   borderLeftColor: '#D1D1D1',
   borderLeftWidth: 1
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.green,
    fontSize: 16,
  },
  receiptsHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'left',
    color: "#343131",
    marginTop: 20,
    paddingBottom: 5
  },
  flatListContent: {
    paddingBottom: 80, // Space for footer
  },
  receiptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    borderBottomColor:'#D7D7D7',
    borderBottomWidth: 1.5,
    marginHorizontal: 10,
    padding: 20,
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
    fontFamily: 'Raleway-Light',
    lineHeight: 21.5
  },
  phoneText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#646464',
  },
  nameText: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: '#2D2D2D',
    paddingBottom: 7
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 19,
    color: Colors.dark,
    fontFamily: 'Poppins-Medium'
  },
  addText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.green,
    fontFamily: 'Poppins-SemiBold'
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerButton: {
    backgroundColor: Colors.green,
    width: '90%',
    padding: 17,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Medium'
  },
});
