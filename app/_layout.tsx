import { Stack } from "expo-router";
import { StatusBar, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";


export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown :false}} >
      <Stack.Screen  name="index"/>
    </Stack>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily :'MyCustomFont'
  },
})