import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    Button,
    StatusBar
} from 'react-native';
import FBSDK ,{
    LoginManager,
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import {
    SocialIcon
} from 'react-native-elements';
import inputimg from '../../img/1.png';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#0094ff',
        flexDirection : 'column'
    },
    boxlogin : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : 'red'
    },
    boxlogo : {
        flex : 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})



export default class LoginScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            loading : false
        }
    }

    
    handleFacebookLogin = () => {
        
        this.setState({
            loading : true
        })
        LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends',])
        .then((result) => {
            if(result.isCancelled){
                return Promise.reject(new Error('The user cancelled the request'));
            }
            else{
                AccessToken.getCurrentAccessToken().then((data) => {
                    let accessToken = data.accessToken
                    this.props.GetFBAccessTokenAction(data)
                    const infoRequest = new GraphRequest(
                        '/me',
                        {
                            accessToken : accessToken,
                            parameters : {
                                fields : {
                                    string : 'email,name,picture.type(large)'
                                }
                            }
                        },
                        (error,result) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                this.props.GetFBDataAction(result)
                            }
                        }
                    )
                    let x = new GraphRequestManager().addRequest(infoRequest).start();
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    return firebase.auth().signInAndRetrieveDataWithCredential(credential).then((result) => {
                        this.props.GetUserFirebaseAction(result.user)
                        this.props.setImageDownloadURLAction()
                        this.props.navigation.navigate("Main");
                    })
                    
                },(error => {
                    console.log('Some error');
                }));
            }
        })
    }
    

    


    render(){
        return(
            
            <View style = {styles.container}>
            <StatusBar backgroundColor = "#0094ff" barstyle = "light-content"/>
                <View style = {styles.boxlogo}>
                    <Image
                        source ={require('../../img/Name.png')}
                    />
                </View>
                
                <View style = {styles.boxlogin}>
            
                    <SocialIcon
                        title = "Sign In With Facebook"
                        button
                        loading = {this.state.loading}
                        type = "facebook"
                        style = {{width : 300,height : 60}}
                        onPress={this.handleFacebookLogin}
                        onLongPress = {this.handleFacebookLogin}
                        iconSize = {30}
                    />
                    
                </View>

            </View>
        )
    }
}