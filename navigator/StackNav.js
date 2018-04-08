import React from 'react';
import {
    View,
    Text
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ModalLoading from '../src/ModalLoading';
// import MainScreen from '../src/MainScreen';
import PhotoScreen from '../src/CameraScreen';
import ImageScreen from '../src/ImageScreen';

const StackNav = StackNavigator(
    {
        Photo : {
            screen : PhotoScreen,
            navigationOptions : ({navigation}) => ({
                headerTransparent : true,
                headerLeft : null
            })
        },
        Modal : {
            screen : ModalLoading,
            navigationOptions : ({navigation}) => ({
                headerTransparent : true,
                headerLeft : null
            })
        },
        Image : {
            screen : ImageScreen,
            navigationOptions : ({navigation}) => ({
                headerTransparent : true,
                headerLeft : null
            })
        },
        // Main : {
        //     screen : MainScreen,
        //     navigationOptions : ({navigation}) => ({
        //         headerTransparent : true,
        //         headerLeft : null
        //     })
        // }
    },
    {
        initialRouteName : 'Photo',
    }
)

export default StackNav;