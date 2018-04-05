import React from 'react';
import { TabNavigator ,TabBarBottom } from 'react-navigation';
import {
    AppRegistry,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MainScreen from '../src/MainScreen';
import PhotoScreen from '../src/PhotoScreen';
import ProfileScreen from '../src/ProfileScreen';
export default TabNavigator(

    {
        Photo : {
            screen : PhotoScreen
        },
        Main : {
            screen : MainScreen
        },
        Profile : {
            screen : ProfileScreen
        },
    },
    {
        navigationOptions : ({ navigation }) => ({
            
            tabBarIcon : ({ focused , tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Main'){
                    iconName = 'home'
                }
                else if(routeName === 'Photo'){
                    iconName = 'photo-camera'
                }
                else if(routeName === 'Profile'){
                    iconName = 'person'
                }
                return <Icon name = {iconName} size = {25} color = {tintColor} />
            }
        }),
        tabBarOptions : {
            activeTintColor: '#0094ff',
            inactiveTintColor: 'gray',
            showIcon : true,
            style :{
                backgroundColor : 'white',
            }
        },
        initialRouteName: 'Main',
        tabBarComponent : TabBarBottom,
        tabBarPosition : 'bottom',
        animationEnabled : true,
        swipeEnabled : true,
        
    }
)