import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransferMoneyScreen from './TransferMoney';
import PaymentDetailsScreen from './TransferDetails/PaymentDetails';
import RecieveDetails from './TransferDetails/RecievedDetails';
import RequestDetails from './TransferDetails/RequestedDetails';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> {/* Ensure headerShown is false */}
      <Stack.Screen name="Tabs" component={TransferMoneyScreen} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
      <Stack.Screen name="RequestDetails" component={RequestDetails} />
      <Stack.Screen name="RecieveDetails" component={RecieveDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
