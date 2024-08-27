import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TextInput, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Alert, StyleSheet } from 'react-native';
import { Colors } from '../../constants/constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { deleteReceipt } from '../../../store/slice/UserInfoSlice';
import { Snackbar } from 'react-native-paper';
import Header from '@/components/HeaderBack';

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

const AdditionalScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const receipts = useSelector((state) => state.user.receipts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const route = useRoute();
  const { success } = route.params || 'not success';
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [createdVisible, SetCreatedVisible] = useState(false);

  useEffect(() => {
    if (success) {
      setSnackbarMessage('You’ve successfully updated this recipient');
      setSnackbarVisible(true);
    }
  }, [success]);

  useEffect(() => {
    if (createdVisible) {
      setSnackbarMessage('You’ve successfully added a recipient');
      setSnackbarVisible(true);
    }
  }, [createdVisible]);

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


  const handleEdit = useCallback(() => {
    setModalVisible(false);
    if (selectedReceipt) {
      navigation.navigate('EditRecipt', { ...selectedReceipt });
    }
  }, [selectedReceipt, navigation]);

  const handleDelete = useCallback(() => {
    if (selectedReceipt) {
      Alert.alert(
        'Delete Receipt',
        `Are you sure you want to delete ${selectedReceipt.firstName} ${selectedReceipt.lastName}?`,
        [
          {
            text: 'No',
            onPress: () => setModalVisible(false),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              dispatch(deleteReceipt(selectedReceipt.phoneNumber));
              setSnackbarMessage(`You’ve successfully deleted ${selectedReceipt.firstName} ${selectedReceipt.lastName}`);
              setSnackbarVisible(true);
              setModalVisible(false);
            },
            style: 'default',
          },
        ]
      );
    }
  }, [selectedReceipt, dispatch]);

  const renderReceipt = useCallback(
    ({ item }) => {
      const { firstName, lastName, phoneNumber } = item;
      const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  
      return (
        <View style={styles.receiptContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.receiptCircle}>
                <Text style={styles.initials}>{initials}</Text>
              </View>
              <View>
                <Text style={styles.nameText}>{firstName} {lastName}</Text>
                <Text style={styles.phoneText}>{phoneNumber}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.infoImageContainer}
              onPress={() => {
                setSelectedReceipt(item);
                setModalVisible(true);
              }}
            >
              <Image source={require('../../../assets/images/info.png')} style={styles.infoImage} />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    []
  );
  

  const DefaultHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Manage Your Recipients</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonLeft} onPress={() => setIsSearching(true)}>
          <AntDesign name="search1" size={30} color={Colors.green} />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRight} onPress={() => navigation.navigate('ManageAddRecipt')}>
          <Entypo name="plus" size={38} color={Colors.green} />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.receiptsHeader}>All Recipients</Text>
    </View>
  );

  return (
    <View style={styles.container}>
            <Header />

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
                  <Text style={styles.modalTitle}>Select one</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={32} color={Colors.dark} style={{ paddingRight: 20 }} />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                    <Image source={require('../../../assets/images/edit.png')} />
                    <Text style={styles.modalButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
                    <Image source={require('../../../assets/images/trash.png')} />
                    <Text style={styles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Snackbar
  visible={snackbarVisible}
  onDismiss={() => setSnackbarVisible(false)}
  duration={5000} // Duration in milliseconds (2000ms = 2s)
  style={styles.snackbar}
>
  <View style={styles.snackbarContent}>
    <MaterialIcons name="done-outline" size={20} color="black" />
    <Text style={styles.snackbarText}>{snackbarMessage}</Text>
    <TouchableOpacity onPress={() => setSnackbarVisible(false)}>
      <Image source={require('../../../assets/images/cancel.png')} style={styles.cancelImg} />
    </TouchableOpacity>
  </View>
</Snackbar>

    </View>
  );
};

export default AdditionalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 26
  },
  headerText: {
    fontSize: 27,
    marginBottom: 0,
    color: Colors.dark,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
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
  },
  snackbar: {
    position: 'absolute',
    bottom: 8,
    width: '90%',
    backgroundColor: '#ADF1CE',
    elevation: 8, // Android shadow
    shadowColor: '#333', // iOS shadow
    shadowOffset: { width: 2, height: 2 }, // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 3.84, // iOS shadow,
    left: 0,
    borderRadius: 12,
    paddingVertical: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20
  },
  snackbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between items
    alignItems: 'center',
    flex: 1, // Take up all available space
  },
  snackbarText: {
    color: Colors.green,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left', // Center the text
    flex: 1, // Take up all available space
    fontSize: 13,
    paddingLeft: 8
  },
  cancelImg: {
    width: 12,
    height: 12,
    marginLeft: 20
  },
  recentHeader: {
    marginTop: 20,
    fontSize: 17,
    color: Colors.green,
    fontFamily: 'Poppins-SemiBold',
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
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    paddingHorizontal: 10, // Add some padding for spacing
    gap: 5
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
    borderLeftWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.green,
  },
  receiptsHeader: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'Poppins-Medium',
  },
  receiptContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#D7D7D7',
    borderBottomWidth: 1,
    paddingVertical: 3,
    marginVertical: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures space between the two containers
    borderBottomColor: '#D7D7D7',
    borderBottomWidth: 1,
    paddingVertical: 7,
    marginVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 8, // Takes up 80% of the width
  },
  receiptCircle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
  },
  nameText: {
    color: Colors.dark,
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
  },
  phoneText: {
    color: Colors.dark,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    paddingTop: 5,
  },
  infoImageContainer: {
    flex: 2, // Takes up 20% of the width
    alignItems: 'flex-end', // Aligns the image to the right
    paddingVertical: 20,
    paddingLeft: 50
  },
  infoImage: {
    width: 7,
    height: 20,
    resizeMode: 'contain',

  },
  flatListContent: {
    paddingBottom: 20,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noResultsText: {
    color: Colors.dark,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  addText: {
    color: Colors.green,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
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
