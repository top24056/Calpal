import React from 'react';
import {
    View,
    Text,
    StatusBar
} from 'react-native';
import {StackNavigator , SwitchNavigator} from 'react-navigation';
import LoginContainer from '../containers/LoginContainer';
import TabNav from './TabNav';
import ProfileContainer from '../containers/ProfileContainer';

export default SwitchNavigator(
    {
        Login : {
            screen : LoginContainer
        },
        Main : {
            screen : TabNav
        },
        Profile : {
            screen : ProfileContainer
        }
    },
    {
        initialRouteName : 'Login'
    }
)