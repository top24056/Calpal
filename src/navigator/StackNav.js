import React from 'react';
import {
    View,
    Text
} from 'react-native';
import {StackNavigator} from 'react-navigation';
// import ModalLoading from '../Components/ModalLoading';
// import MainScreen from '../src/MainScreen';
import CameraContainer from '../containers/CameraContainer';
import ImageScreen from '../Components/ImageScreen';
import ImageContainer from '../containers/ImageContainer';
import ModalContainer from '../containers/ModalContainer';

const StackNav = StackNavigator(
    {
        Photo : {
            screen : CameraContainer,
            navigationOptions : ({navigation}) => ({
                headerTransparent : true,
                headerLeft : null
            })
        },
        Modal : {
            screen : ModalContainer,
            navigationOptions : ({navigation}) => ({
                headerTransparent : true,
                headerLeft : null
            })
        },
        Image : {
            screen : ImageContainer,
            navigationOptions : ({navigation}) => ({
                headerTransparent : true,
                headerLeft : null
            })
        },
    },
    {
        initialRouteName : 'Photo',
    }
)

export default StackNav;