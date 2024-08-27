import { Image, StatusBar, StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import Header from '@/components/HdrWoutIcon';

const SpotHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <Header />
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('SelectReciept')} style={styles.buttonContainer}>
          <Image 
            source={require('../assets/images/send.png')} 
            style={styles.image} 
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('RequestSelectRecipt')} style={styles.buttonContainer}>
          <Image 
            source={require('../assets/images/request.png')} 
            style={styles.image} 
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SpotHome;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly', // Equally space the items within the container
    alignItems: 'center', // Center items horizontally
    paddingVertical: 5, // Padding at the top and bottom
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center', // Center the images within the container
    justifyContent: 'space-evenly',
    flex: 1
  },
  image: {
    width: 300,
    resizeMode: 'contain',
  },
});
