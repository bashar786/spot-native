import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SettingScreen from './tabsScreens/SettingScreen';
import ActivityScreen from './tabsScreens/ActivityScreen';
import ProfileScreen from './ProfileScreen';
import SpotHome from './SpotHome';
import QrcodeScreen from './tabsScreens/Qr code/QrcodeScreen';
import HeaderInnerApp from '@/components/HeaderInnerApp';
import AdditionalScreen from './SendMoney/SelectRecipt'; // Import your additional screen
import AddReciept from './SendMoney/AddReciept';
import SelectPaymentMethod from './SendMoney/SelectPaymentMethod';
import EnterAmount from './SendMoney/EnterAmount';
import DoubleCheckReciept from './SendMoney/DoubleCheckReciept';
import ReviewAndSend from './SendMoney/ReviewAndSend';
import MoneySend from './SendMoney/MoneySend';
import HdrWoutIcon from '../components/HdrWoutIcon';
import SearchReciept from './SendMoney/SeachReciept';
import Recipients from './SendMoney/SeachReciept';
import RequestEnterAmount from './RequestMoney/RequestEnterAmount';
import RequestReviewAndSend from './RequestMoney/RequestReviewAndSend';
import RequestAddReciept from './RequestMoney/RequestAddReciept';
import RequestSelectRecipt from './RequestMoney/RequestSelectRecipt';
import RequestMoneySend from './RequestMoney/RequestSend';
import RequestSearch from './RequestMoney/RequestSearch';
import ManageRecipts from './tabsScreens/ManageReciepts/ManageReciepts';
import EditReciptScreen from './EditReciptScreen';
import ManageAddReciept from './tabsScreens/ManageReciepts/AddRecipt';
import SendDetails from './TransferDetails/PaymentDetails'
import RecieveDetails from './TransferDetails/RecievedDetails'
import RequestDetails from './TransferDetails/RequestedDetails'
import DoubleCheckRecieve from './RequestMoney/DoubleCheckReciept';
import RequestPaymentMethod from './RequestMoney/SelectPaymentMethod'
// Custom SpotLogo Icon Component
const SpotLogoIcon = () => (
  <Image source={require('../assets/images/spothome.png')} style={styles.spothome} />
);

// Screen Components
const Profile = () => (
  <ProfileScreen />
);

const Activity = () => (
  <ActivityScreen />
);

const Settings = () => (
  <SettingScreen />
);

const QRCode = () => (
  <QrcodeScreen />
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconSource;

        switch (route.name) {
          case 'Recipients':
            iconSource = require('../assets/images/reciepts.png');
            break;
          case 'Activities':
            iconSource = require('../assets/images/notes.png');
            break;
          case 'Settings':
            iconSource = require('../assets/images/settings.png');
            break;
          case 'Qr Code':
            iconSource = require('../assets/images/qr-scan1.png');
            break;
          case 'Home':
            return <SpotLogoIcon />;
          default:
            iconSource = null;
            break;
        }

        return <Image source={iconSource} style={[styles.tabIcon, { tintColor: color }]} />;
      },
      tabBarLabel: ({ color }) => (
        <Text style={[styles.tabBarLabel, { color }]}>
          {route.name === 'Home' ? 'Home' : route.name}
        </Text>
      ),
      tabBarStyle: {
        backgroundColor: '#EEEEEE',
        height: 99,
        paddingHorizontal: 10,
        paddingTop: 8
      },
      tabBarItemStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      tabBarInactiveTintColor: 'black',
      tabBarActiveTintColor: '#1E3B2F',

      headerShown: false, // Ensure the header is hidden for tabs
    })}
  >
    <Tab.Screen name="Qr Code" component={QRCode} />

    <Tab.Screen name="Activities" component={Activity} />

    <Tab.Screen name="Home" component={SpotHome} options={{headerShown: false}} />
    <Tab.Screen name="Recipients" component={ManageRecipts} />

    <Tab.Screen name="Settings" component={Settings} />

  </Tab.Navigator>
);

const Stack = createStackNavigator();

const RootStackNavigator = () => (
  <Stack.Navigator
    screenOptions={({ route }) => ({
      header: () => {
        // Conditionally render header based on the current route
        const receiptOrMoneySendRoutes = [
          'SelectReciept',
          'AddReciept',
          'SelectPaymentMethod',
          'EnterAmount',
          'DoubleCheckReciept',
          'ReviewAndSend',
          'MoneySend',
          'Settings',
          'QrCode',
          'Activity',
          'SearchReciept',
          'RequestSearchReciept',
          'RequestEnterAmount',
          'RequestReviewAndSend',
          'RequestSelectRecipt',
          'RequestAddReciept',
          'EditRecipt',
          'ManageAddRecipt',
          'SendDetails',
          'DoubleCheckRecieve',
          'RequestPaymentMethod',
          'Recipients'
        ];

        if (receiptOrMoneySendRoutes.includes(route.name)) {
          return <HeaderInnerApp />;
        } else {
        }
      },
    })}
  >
    <Stack.Screen name="Main" component={TabNavigator} />
    <Stack.Screen name="SelectReciept" component={AdditionalScreen} />
    <Stack.Screen name="AddReciept" component={AddReciept} />
    <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} />
    <Stack.Screen name="ReviewAndSend" component={ReviewAndSend} />
    <Stack.Screen name="EnterAmount" component={EnterAmount} />
    <Stack.Screen name="DoubleCheckReciept" component={DoubleCheckReciept} />
    <Stack.Screen name="MoneySend" component={MoneySend} />
    <Stack.Screen name="SearchReciept" component={SearchReciept} />
    <Stack.Screen name="RequestAddReciept" component={RequestAddReciept} />
    <Stack.Screen name="RequestReviewAndSend" component={RequestReviewAndSend} />
    <Stack.Screen name="RequestEnterAmount" component={RequestEnterAmount} />
    <Stack.Screen name="RequestSelectRecipt" component={RequestSelectRecipt} />
    <Stack.Screen name="RequestMoneySend" component={RequestMoneySend} />
    <Stack.Screen name="RequestSearch" component={RequestSearch} />
    <Stack.Screen name="EditRecipt" component={EditReciptScreen} />
    <Stack.Screen name="ManageAddRecipt" component={ManageAddReciept} />
    <Stack.Screen name="SendDetails" component={SendDetails} />
    <Stack.Screen name="RequestDetails" component={RequestDetails} />
    <Stack.Screen name="RecieveDetails" component={RecieveDetails} options={{headerShown: false}} />
    <Stack.Screen name="DoubleCheckRecieve" component={DoubleCheckRecieve} options={{headerShown: false}} />
    <Stack.Screen name="RequestPaymentMethod" component={RequestPaymentMethod} options={{headerShown: false}} />

  </Stack.Navigator>
);

const App = () => {
  return (
    <RootStackNavigator />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1D3B2F',
    height: 99,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 70,
    resizeMode: 'contain',
  },
  spothome: {
    width: 38, 
    height: 38, 
    resizeMode: 'contain',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    paddingBottom: 15,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  screenText: {
    fontSize: 18,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13
  },
  tabIcon: {
    width: 38, 
    height: 38, 
    resizeMode: 'contain',
    color: 'black'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 638
  },
});

export default App;
