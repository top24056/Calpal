import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Provider } from 'react-redux'; 
import Store from './src/Store';
import TabNav from './src/navigator/TabNav';
import SwitchNavigator from './src/navigator/SwitchNav'
import LoginContainer from './src/containers/LoginContainer'

import ImageContainer from './src/containers/ImageContainer'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      
      <Provider store={Store}>
        
        {/* <TabNav /> */}
        <SwitchNavigator/>

      </Provider>
    );
  }
}
