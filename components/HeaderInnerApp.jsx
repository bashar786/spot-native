import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
  const navigation = useNavigation();
  
  const onSignOut = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you’d like to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => navigation.navigate('HomeScreen')
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.header}>
      {/* Back Arrow Icon */}
      <TouchableOpacity style={styles.iconContainer} onPress={()=> navigation.goBack()} >
     
             <Ionicons
              name="arrow-back-outline"
              size={32}
              color="#fff"
              style={[styles.icon,{width: 25, height: 28}]}
              />
      </TouchableOpacity>

      {/* Spot Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/spotnew.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Sign Out Icon */}
      <TouchableOpacity onPress={onSignOut} style={styles.iconContainer}>
        <Image 
          source={require('../assets/images/Logout.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1D3B2F',
    height: 115,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: '100%',
    paddingBottom: 5,
  },
  iconContainer: {
    padding: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 55,
    width: 300,
  },
  icon: {
    height: 26,
    width: 26,
  },
});

export default Header;
