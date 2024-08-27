// ./SearchHeader.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity , StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/screens/constants/constants';

const SearchHeader = ({ searchQuery, setSearchQuery, onCloseSearch }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      <Text style={styles.headerText}>Search Recipient</Text>
      <TouchableOpacity onPress={onCloseSearch}>
        <Ionicons name="close" size={30} color={Colors.dark} />
      </TouchableOpacity>
    </View>
    <Text style={styles.subHeaderText}>Search Name or Mobile Numbers</Text>
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
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.white,
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  subHeaderText: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  recentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },

})