import React from 'react';
import { TabNavigator ,TabBarBottom } from 'react-navigation';
import {
    AppRegistry,
    View
} from 'react-native';
import MainScreen from '../src/MainScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PhotoScreen from '../src/PhotoScreen';
export default TabNavigator(
    {
        Main : {
            screen : MainScreen
        },
        Photo : {
            screen : PhotoScreen
        }
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
                return <Icon name = {iconName} size = {25} color = {"#0094ff"} />
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