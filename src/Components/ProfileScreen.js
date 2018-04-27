import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Picker,
    Button
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RaisedTextButton } from 'react-native-material-buttons';
import FBSDK ,{
    LoginManager
} from 'react-native-fbsdk';
import {
    LineChart,
    Grid,
    YAxis,
    XAxis
} from 'react-native-svg-charts';
// import logoutImg from '../../img/logout.png;'

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
        // backgroundColor : 'red'
    },
    boxprofilecontent : {
        flexDirection : 'column',
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
    boxlogout : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        margin : 10
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

        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

        const contentInset = {
            top : 20,
            bottom : 20
        }
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30


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
                <View style = {styles.boxprofile}>
                    <View style = {styles.boxprofileimage}>
                        <Avatar
                            xlarge
                            rounded
                            style={{width: 48, height: 32}}
                            source = {{uri : this.props.fb.data_profile.picture.data.url}}
                        />
                    </View>
                    <View style = {styles.boxprofilecontent}>
                        </View>
                        <View style = {{flex : 1}}>
                        </View>
                        <View style = {{flex : 1}}>
                        </View>
                        <View style = {{flex : 1}}>
                        </View>
                        <View style = {{flex : 1}}>
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
                <View style = {styles.boxcontent}>
                        <YAxis
                            data={data}
                            style={{ marginBottom: xAxisHeight }}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <LineChart
                                style={{ flex: 1 }}
                                data={data}
                                contentInset={verticalContentInset}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                            >
                                <Grid/>
                            </LineChart>
                            <XAxis
                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                data={data}

                                formatLabel={(value, index) => index}
                                contentInset={{ left: 10, right: 10 }}
                                svg={axesSvg}
                            />
                        </View>
                    </View>
                </View>

                
                

                <View style = {styles.boxlogout}>
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
                        <View style = {{alignItems:'center',flexDirection:'row',backgroundColor :'#4267b2',padding : 10}}>
                            <Image source = {require('../../img/logout.png')}/>
                            <Text style = {{color :'white',paddingLeft : 10}}>Log out</Text>
                        </View>
                    </TouchableOpacity>

                   
                </View>
            </KeyboardAwareScrollView>
        );
    }
}