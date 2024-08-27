import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { Colors } from '../constants/constants';
import Send from '../TransferDetails/Send';
import Request from '../TransferDetails/Request';
import Pending from '../TransferDetails/Pending';
import Recieve from '../TransferDetails/Recieve';
import Header from '@/components/HeaderBack';

const ActivityScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Sent');

  const renderComponent = () => {
    switch (selectedTab) {
      case 'Sent':
        return <Send />;
      case 'Received':
        return <Recieve />;
      case 'Request':
        return <Request />;
      case 'Pending':
        return <Pending />;
      default:
        return null;
    }
  };

  const isVirtualizedList = component => {
    return component.type === FlatList || component.type?.displayName === 'FlatList';
  };

  const selectedComponent = renderComponent();

  return (
    <View style={{flex: 1}}>
            <Header />

    <View style={styles.container}>

      <Text style={{ color: Colors.dark, fontSize: 27 }}>Activities</Text>
      <View style={styles.tabContainer}>
        {['Sent', 'Received', 'Request'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.selectedTab,
              selectedTab !== tab && styles.unselectedTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab ? styles.selectedTabText : styles.unselectedTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {isVirtualizedList(selectedComponent) ? (
        <View style={styles.componentContainer}>{selectedComponent}</View>
      ) : (
        <View style={styles.componentContainer}>{selectedComponent}</View>
      )}
    </View>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 26,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
  },
  tab: {
    borderRadius: 15,
    paddingVertical: 14,
  },
  selectedTab: {
    backgroundColor: Colors.green,
    width: '34%',
    alignItems: 'center'
  },
  unselectedTab: {
    backgroundColor: Colors.grey,
    width: '33%',
    alignItems: 'center'
  },
  tabText: {
    fontSize: 15,
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
    marginTop: 20,
    backgroundColor: '#fff',
  },
});
