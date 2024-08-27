import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/constants';
import Scan from './Scan';
import QrCode from './QrCode';
import Header from '@/components/HeaderBack';

const QrcodeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Your codes');

  const renderComponent = () => {
    switch (selectedTab) {
      case 'Scan':
        return <Scan />;
      case 'Your codes':
        return <QrCode />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <View style={styles.container}>
        <View style={{padding: 20, paddingTop: -20}}>
        <Text style={styles.title}>Qr Code</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'Your codes' && styles.selectedTab,
              selectedTab !== 'Your codes' && styles.unselectedTab,
            ]}
            onPress={() => setSelectedTab('Your codes')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Your codes' ? styles.selectedTabText : styles.unselectedTabText,
              ]}
            >
              Your codes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'Scan' && styles.selectedTab,
              selectedTab !== 'Scan' && styles.unselectedTab,
            ]}
            onPress={() => setSelectedTab('Scan')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Scan' ? styles.selectedTabText : styles.unselectedTabText,
              ]}
            >
              Scan
            </Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.componentContainer}>{renderComponent()}</View>
      </View>
    </ScrollView>
  );
};

export default QrcodeScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 26,
    backgroundColor: '#fff',
  },
  title: {
    color: Colors.dark,
    fontSize: 27,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: Colors.grey,
    borderRadius: 15,
    marginLeft: -2,
  },
  tab: {
    paddingVertical:13,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    backgroundColor: Colors.green,
  },
  unselectedTab: {
    backgroundColor: Colors.grey,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  selectedTabText: {
    color: '#fff',
  },
  unselectedTabText: {
    color: Colors.green,
  },
  componentContainer: {
    flex: 1,
    marginTop: 31,
    backgroundColor: '#fff',
  },
});
