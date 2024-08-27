import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: '15%', alignItems: 'center'}}>
      <Ionicons name="arrow-back-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={{width: '70%',}}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={{width: '15%'}}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1D3B2F',
    height: 115,
    justifyContent: 'flex-end',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 27
  },
  headerText: {
    color: '#fff',
    fontSize: 21,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '650',
  },
});

export default Header;
