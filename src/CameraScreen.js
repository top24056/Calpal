import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight,
    TouchableOpacity,
    Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Imagescreen from './ImageScreen';
import Spinner from 'react-native-loading-spinner-overlay';



const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    preview : {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    boxcamera : {
        flex : 2,
        flexDirection : 'column'
    },
    boxcapture : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    },
    innercirclecapture : {
        width : 60,
        height : 60,
        borderRadius : 130/2,
        borderWidth : 7,
        backgroundColor : '#0094ff',
        borderColor : 'white'
    },
    outcirclecapture : {
        width : 70,
        height : 70,
        borderRadius : 140/2,
        backgroundColor : '#0094ff',
        padding : 5
    }
})

export default class PhotoScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            path : null,
        };
    }


    
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.boxcamera}>
                    <RNCamera 
                        ref = {ref => {
                            this.camera = ref;
                        }}
                        style = {styles.preview}
                        type = {RNCamera.Constants.Type.back}
                        permissionDialogTitle = {'Permission to use Camera'}
                        permissionDialogMessage = {'We need your permission to use your camera phone'}
                    />
                </View>
                <View style = {styles.boxcapture}>
                    <TouchableOpacity onPress = {this.takePicture.bind(this)} activeOpacity = {0.1}>
                        <View style = {styles.outcirclecapture}>
                            <View style = {styles.innercirclecapture}>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    takePicture = async function(){
        if(this.camera){
            const options = {
                quality : 1,
                base64 : true,
                width : 500
            };
            const data = await this.camera.takePictureAsync(options);
            this.setState({
                path : data.uri
            })
            console.log(data);
            this.props.navigation.navigate("Modal");
        }

    }
}