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
    Platform
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';



const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    preview : {
        flex: 1,
        justifyContent: 'center',
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
    },
    framecamera : {
        borderColor : 'white',
        borderWidth : 1,
        height : 250,
        width : 250,
    }
})

const normalRatio = "16:9";

export default class PhotoScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ratio : null,
        };
    }

    prepareRatio = async function(){
        if(Platform.OS === 'android' && this.cam){
            const ratios = await this.cam.getSupportedRatioAsync();
            let ratioinfunc = ratios.find((ratioinfunc) => ratioinfunc == normalRatio) || ratios[ratios.length - 1];
            this.setState({
                ratio : ratioinfunc
            })
        }
    }

    takePicture = async function(){
        if(this.camera){
            const options = {
                quality : 1,
                width : 1000,
                height : 1000,
                fixOrientation : true,
                base64 : true
            };
            console.log('ready')
            const data = await this.camera.takePictureAsync(options);
            this.props.ImageAction(data);

            
            
            this.props.navigation.navigate("Modal");
            
            // console.log("store image = ",this.props.image.image_food)
        }
    }

    
    render(){

        return(
            <View style = {styles.container}>
                <View style = {styles.boxcamera}>
                    <RNCamera 
                        ref = {ref => {
                            this.camera = ref;
                        }}
                        onCameraReady = {this.prepareRatio}
                        style = {styles.preview}
                        type = {RNCamera.Constants.Type.back}
                        permissionDialogTitle = {'Permission to use Camera'}
                        permissionDialogMessage = {'We need your permission to use your camera phone'}
                    >

                        <View style = {styles.framecamera}>
                            
                        </View>
                    </RNCamera>
                    
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

    
}