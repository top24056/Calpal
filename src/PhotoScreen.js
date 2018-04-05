import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet
} from 'react-native';



const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})

export default class PhotoScreen extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text>Homdddde</Text>
            </View>
        );
    }
}