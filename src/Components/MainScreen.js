import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    Button,
} from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import FBSDK ,{
    LoginManager,
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import {
    TextField
} from 'react-native-material-textfield';
import UUIDGenerator from 'react-native-uuid-generator';
import inputimg from '../../img/1.png';


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#E8EAF6'
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
        backgroundColor : 'rgba(0,0,0,.05)'
    },
    box : {
        flex : 1,
        flexDirection : 'row',
        marginLeft : 10,
        marginRight : 10,
        marginTop : 10,
        marginBottom : 10,
        backgroundColor : 'white',
        shadowOpacity: 0.54,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
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
            curcal : 0,
            BMR : 0,
            percentCircle : 0,
            profile : null,
            
            breakfast : {
                namefood : "Add! Breakfast",
                cal : "Recommend Calrories : 388",
            },
            lunch : {
                namefood : "Add! Lunch",
                cal : "Recommend Calrories : 588"
            },
            dinner : {
                namefood : "Add Dinner",
                cal : "Recommend Calrories : 588"
            }
            ,
            isModalVisiable : false
        }
    }
    


    componentDidMount(){
        firebase.database().goOnline();

        let userId = firebase.auth().currentUser.uid
        let ref = firebase.database().ref('users/' + userId);
        firebase.database().ref('users/' + userId).update({
            name : this.props.fb.data_profile.name,
            email: this.props.fb.data_profile.email,
        });
        let hour = new Date().getHours().toString()
        let date = new Date().getDate().toString();
        let tempmonth = new Date().getMonth()+1;
        let month = tempmonth.toString();
        let year = new Date().getFullYear().toString();
        let day = date+'-'+month+'-'+year

        let self = this
        
        let food = ref.child('food').orderByKey().child(day)
        let Query = new Promise((resolve,reject) => {
            food.on('value',function(data){
                if(data.val() === null){
                    console.log('null na ja')
                }
                else{
                    if(data.val().breakfast != null){
                        let tempcal = data.val().breakfast.cal.toString()
                        let temp = {
                            namefood : data.val().breakfast.namefood,
                            cal : "Calories is : " + tempcal
                        }
                        self.setState({
                            breakfast : temp
                        })
                    }
                    if(data.val().lunch != null){
                        let tempcal = data.val().lunch.cal.toString()
                        let temp = {
                            namefood : data.val().lunch.namefood,
                            cal : "Calories is : " + tempcal
                        }
                        self.setState({
                            lunch : temp 
                        })
                    }
                    if(data.val().dinner != null){
                        let tempcal = data.val().dinner.cal.toString()
                        let temp = {
                            namefood : data.val().dinner.namefood,
                            cal : "Calories is : " + tempcal
                        }
                        self.setState({
                            dinner : temp
                        })
                    }
                    if(data.val().sumcal != null){
                        self.setState({
                            curcal : data.val().sumcal
                        })
                    }
                }
                
            })
            let pathprofile = ref.child('profile')
            pathprofile.on('value',function(data){
                if(data.val().BMR){
                    self.setState({
                        BMR : data.val().BMR
                    })
                    resolve()
                }
            })
        })

        Query.then(()=>{
            let p = (this.state.curcal/this.state.BMR) * 100
            console.log(p)
            this.setState({
                percentCircle : p
            })
            
            console.log(this.state.curcal)
            console.log(this.state.percentCircle)
        })

        
        
        


    }

    componentWillReceiveProps(props){
        
    }

    _toggleModal(){
        this.setState({
            isModalVisiable : !this.state.isModalVisiable
        })
    }

    
    render(){

        return(
            <View style = {styles.container}>

                <StatusBar backgroundColor = "#0094ff" barstyle = "light-content"/>
                <View style = {styles.circle}>
                    <View style = {styles.boxname}>
                        <Image source = {require('../../img/Name.png')}/>
                    </View>
                    <View style = {styles.boxcircle}>
                        <PercentageCircle 
                            radius = {80} 
                            percent = {this.state.percentCircle} 
                            color={"#ffffff"} 
                            borderWidth = {4} 
                            bgcolor = {"#0094ff"} 
                            innerColor = {"#0094ff"} 
                            duration = {500} 
                            animationType = 'Quad.easeInOut'>

                            <Text style = {{color : 'white'}}>
                                <Text style = {{fontSize : 24}}>{this.state.curcal} / </Text><Text style = {{fontSize : 14}}>{this.state.BMR}</Text>
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
                            <Text style = {{color : '#858787', fontSize : 18}}>{this.state.breakfast.namefood}</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>{this.state.breakfast.cal} KCal</Text>
                        </View>

                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{
                                this.props.setMealTimeToAdd('breakfast')
                                this.props.navigation.navigate('Photo')
                            }}>
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
                            <Text style = {{color : '#858787', fontSize : 18}}>{this.state.lunch.namefood}</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>{this.state.lunch.cal} KCal</Text>
                        </View>
                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{
                                this.props.setMealTimeToAdd('lunch')
                                this.props.navigation.navigate('Photo')
                            }}>
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
                            <Text style = {{color : '#858787', fontSize : 18}}>{this.state.dinner.namefood}</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>{this.state.dinner.cal} KCal</Text>
                        </View>
                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{
                                this.props.setMealTimeToAdd('dinner')
                                this.props.navigation.navigate('Photo')
                            }}>
                                <View style = {{justifyContent : 'center' ,alignItems : 'center' ,padding : 20}}>
                                    <Image source = {require('../../img/add.png')} style = {{width : 16, height : 16}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    
                    <View style = {styles.box}>
                        <TouchableOpacity onPress = {()=> {
                            console.log('press test')
                            this._toggleModal();
                            
                        }}>
                            <Text>Test</Text>
                        </TouchableOpacity> 


                        
                    </View>


                </View>
            </View>
        );
    }
}