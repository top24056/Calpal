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
import SwitchNavigator from './src/navigator/SwitchNav'


console.ignoredYellowBox = ['Remote debugger']

export default class App extends Component {
  render() {
    return (
      
      <Provider store={Store}>
        
        <SwitchNavigator/>

      </Provider>
    );
  }
}
