import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    Button
} from 'react-native';
import FBSDK ,{
    LoginManager,
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';


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
    },
    boxlogo : {
        flex : 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default class LoginScreen extends React.Component{




    // handleFacebookLogin () {
    //     LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
    //         function (result) {
    //             if (result.isCancelled) {
    //                 console.log('Login cancelled')
    //             }
    //             else {
    //                 console.log('Login success with permissions: ' + result.grantedPermissions.toString())
    //                 AccessToken.getCurrentAccessToken().then((data) =>{
    //                     console.log(data)
    //                     this.props.GetFBAccessTokenAction(data)
    //                 //     let accessToken = data.accessToken
    //                 //     const infoRequest = new GraphRequest(
    //                 //         '/me',
    //                 //         {
    //                 //             accessToken : accessToken,
    //                 //             parameters : {
    //                 //                 fields : {
    //                 //                     string : 'email,name,first_name,middle_name,last_name,picture.type(large)'
    //                 //                 }
    //                 //             }
    //                 //         }
    //                 //     ),
    //                 //     (error,result) => {
    //                 //         if (error) {
    //                 //             console.log(error);
    //                 //         }
    //                 //         else {
    //                 //             this.props.GetFBDataAction(result)
    //                 //         }
    //                 //     };
    //                 })
    //             }
    //         },
    //         function (error) {
    //             console.log('Login fail with error: ' + error)
    //         }
    //     )
    // }
    

    _FBLogin(error, result){
 
        if (error) {
            alert("login has error: " + result.error);
        }
        else if (result.isCancelled) {
            alert("login is cancelled.");
        }
        else {
            AccessToken.getCurrentAccessToken().then((data) => {
                let accessToken = data.accessToken
                alert('Login Success')
                this.props.GetFBAccessTokenAction(data)
                const infoRequest = new GraphRequest(
                    '/me',
                    {
                        accessToken : accessToken,
                        parameters : {
                            fields : {
                                string : 'email,name,first_name,middle_name,last_name,picture.type(large)'
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
                    // this._responseInfoCallback
                );
                let x = new GraphRequestManager().addRequest(infoRequest).start();
            })
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.boxlogo}>
                    <Image
                        source ={require('../../img/Name.png')}
                    />
                </View>
                
                <View style = {styles.boxlogin}>
                    <LoginButton
                        publishPermissions={["publish_actions"]}
                        onLoginFinished={(error, result) => {
                            this._FBLogin(error,result)
                        }}
                        onLogoutFinished={() => alert("logout.")}
                    />



                    {/* <Button
                        title="Continue with fb"
                        color="#4267B2"
                        onPress={this.handleFacebookLogin}
                    /> */}
                    
                </View>

            </View>
        )
    }
}