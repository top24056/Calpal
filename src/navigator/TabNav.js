import React from 'react';
import { TabNavigator ,TabBarBottom } from 'react-navigation';
import {
    AppRegistry,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MainContainer from '../containers/MainContainer';
import StackNav from './StackNav';
import ProfileContainer from '../containers/ProfileContainer';
import LoginContainer from '../containers/LoginContainer';

export default TabNavigator(
    
    {
        Photo : {
            screen : StackNav
        },
        Main : {
            screen : MainContainer
        },
        Profile : {
            screen : ProfileContainer
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