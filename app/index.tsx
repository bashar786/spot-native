import React from 'react';
import Routes from '../components/Routes';
import {Provider} from 'react-redux';
import store from '../store/store'
import { StatusBar } from 'react-native';
const index= () => {
  return (
   <Provider store={store}>
<StatusBar barStyle="light-content" />
      <Routes />
  </Provider>
  );
};


export default index;
