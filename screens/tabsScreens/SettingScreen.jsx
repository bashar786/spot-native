import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from 'expo-router'
import Header from '@/components/HeaderBack'

const SettingScreen = () => {
  const navigation  = useNavigation();
  return (
    <View>
      <Header />
      <Text>SettingScreen</Text>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})