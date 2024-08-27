import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image, Dimensions, ImageBackground, StatusBar } from "react-native";
import { useNavigation } from "expo-router";
import { SvgUri } from 'react-native-svg';
const { width, height } = Dimensions.get('window');
const isIPhone14Pro = width === 393 && height === 852;
const isIPhone15ProMax = width === 430;

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
            <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
   <Image source={require('../assets/images/logo.png')} style={styles.logo} />    
      </View>
      
      <Text style={styles.description}>Secure Payment Online Transfer</Text>
      
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => navigation.navigate('LoginScreen')}
        activeOpacity={0.5}
      >
        <Text style={styles.callNumber}>Log in</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('NumberInputScreen')}
        activeOpacity={0.5}
      >
        <Text style={styles.cancelText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3B2F",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoBackground: {
    height: 100.8, 
    width: 326
  },
  logo:{
    width: 326,
    height: 100.8,
    resizeMode: 'contain'
  },
  description: {
    fontFamily: 'Urbanist-SemiBold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    marginBottom:  isIPhone14Pro? 178 : isIPhone15ProMax? 176: 178, 
        marginTop: 7
  },
  callButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#1D533C",
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 25,
  },
  callNumber: {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Poppins-SemiBold",
  },
  cancelButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    marginBottom: isIPhone14Pro? 92 : isIPhone15ProMax? 94: 92
  },
  cancelText: {
    color: "#1D3B2F",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
});

export default Home;
