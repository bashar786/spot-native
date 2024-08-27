import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomTabBar = () => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabItem}>
        <Image source={require('../assets/images/qr-scan1.png')} style={styles.tabIcon} />
        <Text style={styles.tabLabel}>Qr Code</Text>
      </View>
      <View style={styles.tabItem}>
        <Image source={require('../assets/images/notes.png')} style={styles.tabIcon} />
        <Text style={styles.tabLabel}>Activities</Text>
      </View>
      <View style={styles.tabItem}>
        <Image source={require('../assets/images/spothome.png')} style={styles.spotIcon} />
        <Text style={styles.tabLabel}>Home</Text>
      </View>
      <View style={styles.tabItem}>
        <Image source={require('../assets/images/reciepts.png')} style={styles.tabIcon} />
        <Text style={styles.tabLabel}>Recipients</Text>
      </View>
      <View style={styles.tabItem}>
        <Image source={require('../assets/images/settings.png')} style={styles.tabIcon} />
        <Text style={styles.tabLabel}>Settings</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    height: 99,
    paddingHorizontal: 10,
    paddingTop: 8,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  spotIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  tabLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'black',
    paddingTop: 5,
  },
});

export default CustomTabBar;
