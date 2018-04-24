import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Picker
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    RaisedTextButton
} from 'react-native-material-buttons';
import FBSDK ,{
    LoginManager
} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,.05)',
    },
    boxprofile : {
        flex : 1,
        backgroundColor : '#0094ff',
        flexDirection : 'row',
        
    },
    boxprofileimage : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'flex-start',
        marginTop : 40,
        marginLeft : 20,
        marginBottom : 40,
        // backgroundColor : 'red'
    },
    boxprofilecontent : {
        flex : 1.5,
        flexDirection : 'column',
        marginLeft : 20
        // backgroundColor : 'red'
    },
    boxcontent : {
        flex : 1,
        margin : 10,
        paddingLeft : 10,
        paddingRight : 10,
        backgroundColor : 'white',
        shadowOpacity: 0.54,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
        
    },
    boxgraph : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    boxicon : {
        flex : 0.5,
        flexDirection: 'row',
        justifyContent : 'center',
        alignItems : 'flex-end',
        paddingBottom : 10
    },
    boxtext : {
        flex : 2,
        justifyContent : 'center',
    },
    card : {
        flex : 1,
        margin : 10,
    },
    box : {
        flex : 1,
        flexDirection : 'row'
    }

})



export default class ProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileimage : null,
            information : {
                weight : null,
                height : null,
                age : null,
                gender : null,
                BMR : 0
            }
        }
    }

    componentDidMount(){
        let self = this;
        firebase.database().goOnline();
        let userId = firebase.auth().currentUser.uid
        var ref = firebase.database().ref('users/' + userId);
        let order = ref.child("profile")
        order.on("value",function(data){
            console.log("eiei",data.val())
            let informationcopy = {
                weight : null,
                height : null,
                age : null,
                gender : null,
                BMR : 0
            }
            informationcopy.weight = data.val().weight
            informationcopy.height = data.val().height
            informationcopy.gender = data.val().gender
            informationcopy.age = data.val().age
            informationcopy.BMR = data.val().BMR
            self.setState({
                information : informationcopy
            })
            // console.log(this.state.information)
        })
        
    }

 

    render(){


        const weightinput = (
            <TextInput
                style = {{color : '#0094ff',fontSize : 17}}
                placeholder = {'Weight'}
                placeholderTextColor = {'#0094ff'}
                underlineColorAndroid = {'#0094ff'}
                selectionColor = {'#0094ff'}
                keyboardType = 'numeric'
                onChangeText = {(text) => {
                    let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                    let x = Math.round(text)
                    informationcopy.weight = x
                    this.setState({
                        information : informationcopy
                    })
                }}
            />
        )

        const heightinput = (
            <TextInput 
                style = {{color : '#0094ff',fontSize : 17}}
                placeholder = {'Height'}
                placeholderTextColor = {'#0094ff'}
                underlineColorAndroid = {'#0094ff'}
                selectionColor = {'#0094ff'}
                keyboardType = "numeric"
                onChangeText = {(text) => {
                    let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                    let x = Math.round(text)
                    informationcopy.height = x
                    this.setState({
                        information : informationcopy
                    })
                }}
                
            />
        )

        const ageinput = (
            <TextInput 
                style = {{color : '#0094ff',fontSize : 17}}
                placeholder = {'Age'}
                placeholderTextColor = {'#0094ff'}
                underlineColorAndroid = {'#0094ff'}
                selectionColor = {'#0094ff'}
                keyboardType = "numeric"
                onChangeText = {(text) => {
                    let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                    let x = Math.round(text)
                    informationcopy.age = x
                    this.setState({
                        information : informationcopy
                    })
                }}
            />
        )

        

        

        return(
            <KeyboardAwareScrollView style={styles.container}>
            {/* <View style = {styles.container}> */}
                <View style = {styles.boxprofile}>
                    <View style = {styles.boxprofileimage}>
                        <Avatar
                            xlarge
                            rounded
                            source = {{uri : this.props.fb.data_profile.picture.data.url}}
                        />
                    </View>
                    <View style = {styles.boxprofilecontent}>
                        <View style = {{flex : 1,justifyContent : 'flex-start',alignItems : 'center',marginTop : 40}}>
                            <Text style = {{color : 'white',fontSize : 20,fontWeight : 'bold'}}>{this.props.fb.data_profile.name}</Text>
                        </View>
                        <View style = {{flex : 1}}>
                            <Text style = {{color : 'white',fontSize : 15}}>Weight : {this.state.information.weight}</Text>
                        </View>
                        <View style = {{flex : 1}}>
                            <Text style = {{color : 'white',fontSize : 15}}>Height : {this.state.information.height}</Text>
                        </View>
                        <View style = {{flex : 1}}>
                            <Text style = {{color : 'white',fontSize : 15}}>Age : {this.state.information.age}</Text>
                        </View>
                        <View style = {{flex : 1}}>
                            <Text style = {{color : 'white',fontSize : 15}}>Gender : {this.state.information.gender}</Text>
                        </View>
                    </View>
                    
                </View>

                
                <View style = {styles.boxcontent}>
                    <View style = {styles.card}>
                        <View style = {styles.box}>
                            <View style = {styles.boxicon}>
                                <Image
                                    source = {require('../../img/weight-scale.png')}
                                    style = {{width :30,height : 30}}
                                />
                            </View>
                            <View style = {styles.boxtext}>
                                {weightinput}
                            </View>
                        </View>

                        <View style = {styles.box}>
                            <View style = {styles.boxicon}>
                                <Image
                                    source = {require('../../img/height.png')}
                                    style = {{width :30,height : 30}}
                                />
                            </View>
                            <View style = {styles.boxtext}>
                                {heightinput}
                            </View>
                        </View>

                        <View style = {styles.box}>
                            <View style = {styles.boxicon}>

                                <Image
                                    source = {require('../../img/age.png')}
                                    style = {{width :30,height : 30}}
                                />
                            </View>
                            <View style = {styles.boxtext}>
                                {ageinput}
                            </View>
                        </View>

                        <View style = {styles.box}>
                            <View style = {{flex : 0.5, flexDirection: 'row',justifyContent : 'center',alignItems : 'flex-end',paddingBottom : 10}}>
                                <FontAwesomeIcon name = {'male'} color = {'#0094ff'} size = {25}/>
                                <FontAwesomeIcon name = {'female'} color = {'#ff6beb'} size = {25}/>
                            </View>
                            <View style = {styles.boxtext}>

                                <Picker
                                    selectedValue = {this.state.information.gender}
                                    itemStyle = {{color : '#0094ff'}}
                                    mode = {'dropdown'}
                                    style = {{color : '#0094ff'}}
                                    onValueChange = {(itemValue,itemIndex) => {
                                        console.log('itemvalue',itemValue)
                                        let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                                        informationcopy.gender = itemValue
                                        this.setState({
                                            information : informationcopy
                                        })
                                        console.log(this.state.information.gender)
                                    }}>
                                    
                                    <Picker.Item label = "Male" value = "male"/>
                                    <Picker.Item label = "FeMale" value = "female"/>
                                </Picker>
                                
                            </View>
                        </View>
                        <View style = {{flex : 1,flexDirection : 'row',justifyContent : 'flex-end', margin : 5}}>
                            <View style = {{margin : 5}}>
                                <RaisedTextButton 
                                    rippleDuration = {400} 
                                    rippleOpacity={0.54} 
                                    color='#0094ff' 
                                    title = "Submit" 
                                    titleColor = "white"
                                    onPress = {() => {
                                        console.log('press')
                                        if(this.state.information.gender === 'male'){
                                            let x = 66 + (this.state.information.weight*13.7) + (5*this.state.information.height) - (6.8*this.state.information.age)
                                            let y = x * 1.375
                                            let z = Math.ceil(y)
                                            this.state.information.BMR = z
                                        }
                                        else if(this.state.information.gender === 'female'){
                                            let x = 665 + (this.state.information.weight*9.6) + (1.8*this.state.information.height) - (4.7*this.state.information.age)
                                            let y = x * 1.375
                                            let z = Math.ceil(y)
                                            this.state.information.BMR = z
                                        }
                                        this.props.GetInformationAction(this.state.information)
                                        firebase.database().goOnline();
                                        let userId = firebase.auth().currentUser.uid
                                        let user = firebase.database().ref('users/' + userId);
                                        let valueprofile = {
                                            'weight' : this.state.information.weight,
                                            'height' : this.state.information.height,
                                            'gender' : this.state.information.gender,
                                            'age' : this.state.information.age,
                                            'BMR' : this.state.information.BMR
                                        };
                                        user.child('profile').update(valueprofile)
                                        
                                    }}
                                />
                            </View>
                        </View>

                        
                    </View>
                    
                </View>

                <View style = {styles.boxgraph}>
                    <TouchableOpacity
                        onPress = {() => {
                            
                            this.props.navigation.navigate("Login");
                            LoginManager.logOut((error,data) => {
                                
                                console.log(data)
                                console.log("asd")
                                if(error){
                                    console.log("err",error)
                                }
                                LoginManager.getIntance().logOut()
                            })
                        }}
                    >
                        <Text>logout</Text>
                    </TouchableOpacity>
                </View>

            {/* </View> */}
            </KeyboardAwareScrollView>
        );
    }
}