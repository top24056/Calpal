import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
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
    },
    circle : {
        flex : 0.4,
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : "#0094ff"
    },
    content : {
        flex : 0.6,
        backgroundColor : '#f4f9f9'
    },
    box : {
        flex : 1,
        flexDirection : 'row',
        marginLeft : 10,
        marginRight : 10,
        marginTop : 10,
        marginBottom : 10,
        backgroundColor : 'white',
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },
    boximg : {
        flex : 1,
        padding : 8,
        justifyContent : 'center',
        alignItems : 'center',
    },
    boxtext : {
        flex : 3,
        justifyContent : 'center',
    },
    boxadd : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        // backgroundColor : 'blue'
    },
    boxcircle : {
        flex : 2.5,
        // justifyContent : 'center',
        alignItems : 'center',
    },
    boxname : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    
    
})



export default class MainScreen extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
            photo : "You don't have photo",
            curtime : null,
            currentcal : 0,
            percentCircle : 0,
            
            profile : null,
            food:{
                breakfast : {
                    name : "Add! Breakfast",
                    calpre : "Recommend Calrories : 388 KCal",
                },
                lunch : {
                    name : "Add! Lunch",
                    calpre : "Recommend Calrories : 588 KCal"
                },
                dinner : {
                    name : "Add Dinner",
                    calpre : "Recommend Calrories : 588 KCal"
                }
            },
        }
    }

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
                                string : 'name,picture.type(large)'
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

    
    


    componentDidMount(){
        setInterval( ()=>{
            this.setState({
                curtime : new Date().toLocaleString()
            })
        },1000)

    }

    
    render(){
        // var imgwater = [];
        
        
        // for (let i = 0 ; i < 8 ; i++){
        //     imgwater.push(
        //         <View key = {i} style = {styles.boximg}>
        //             <TouchableOpacity onPress = {() => {
        //                 let copyObject = Object.assign({}, this.state.colorwater)
        //                 for (let j = i ; j >= 0 ; j -- ){
        //                     copyObject[j.toString()] = 1
        //                 }
        //                 for (let k = i+1 ; k < 8 ; k++ ){
        //                     copyObject[k.toString()] = 0.1
        //                 }
        //                 this.setState({
        //                     colorwater : copyObject,
        //                     count : i+1
        //                 })
        //             }}>
        //                 <Image source = {require('../../img/water-glasess.png')} style = {{ width : 45 , height : 45}} opacity = {this.state.colorwater[i.toString()]}/>
        //             </TouchableOpacity>
        //         </View>
        //     )
        // }


        return(
            <View style = {styles.container}>
                <StatusBar backgroundColor = {'transparent'} translucent/>
                <View style = {styles.circle}>
                    <View style = {styles.boxname}>
                        <Image source = {require('../../img/Name.png')}/>
                    </View>
                    <View style = {styles.boxcircle}>
                        <PercentageCircle 
                            radius = {80} 
                            percent = {50} 
                            color={"#ffffff"} 
                            borderWidth = {4} 
                            bgcolor = {"#0094ff"} 
                            innerColor = {"#0094ff"} 
                            duration = {500} 
                            animationType = 'Quad.easeInOut'>

                            <Text style = {{color : 'white'}}>
                                <Text style = {{fontSize : 24}}>{this.props.food.total_calperday} / </Text><Text style = {{fontSize : 14}}>3850</Text>
                            </Text>
                            <Text style = {{color : 'white' , fontSize : 15}}>KCal</Text>
                            
                        </PercentageCircle>
                    </View>
                    
                </View>


                <View style = {styles.content}>

                    <View style = {styles.box}>
                        <View style = {styles.boximg}>
                            <Image source = {require('../../img/breakfast.png')} style = {{width : 64, height : 64}}/>
                        </View>
                        <View style = {styles.boxtext}>
                            <Text style = {{color : '#858787', fontSize : 18}}>{this.state.food.breakfast.name}</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>{this.state.food.breakfast.calpre}</Text>
                        </View>

                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Photo')}}>
                                <View style = {{justifyContent : 'center' ,alignItems : 'center' ,padding : 20}}>
                                    <Image source = {require('../../img/add.png')} style = {{width : 16, height : 16}}/>
                                </View>
        
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style = {styles.box}>
                        <View style = {styles.boximg}>
                            <Image source = {require('../../img/rice.png') } style = {{width : 64, height : 64}}/>
                        </View>
                        <View style = {styles.boxtext}>
                            <Text style = {{color : '#858787', fontSize : 18}}>Add! Lunch</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>Recommend Calrories : 588 KCal</Text>
                        </View>
                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Photo')}}>
                                <View style = {{justifyContent : 'center' ,alignItems : 'center' ,padding : 20}}>
                                    <Image source = {require('../../img/add.png')} style = {{width : 16, height : 16}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style = {styles.box}>
                        <View style = {styles.boximg}>
                            <Image source = {require('../../img/fish.png')} style = {{width : 64, height : 64}}/>
                        </View>
                        <View style = {styles.boxtext}>
                            <Text style = {{color : '#858787', fontSize : 18}}>Add! Dinner</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>Recommend Calrories : 588 KCal</Text>
                        </View>
                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Photo')}}>
                                <View style = {{justifyContent : 'center' ,alignItems : 'center' ,padding : 20}}>
                                    <Image source = {require('../../img/add.png')} style = {{width : 16, height : 16}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style = {styles.box}>
                        <View style = {{flex :1 ,justifyContent: 'center',alignItems: 'center'}}>
                            <LoginButton
                                publishPermissions={["publish_actions"]}
                                onLoginFinished={(error,result) => {
                                    this._FBLogin(error,result)
                                }}
                                onLogoutFinished={() => alert("logout.")}
                            />
                        </View>
                    </View>


                </View>
            </View>
        );
    }
}