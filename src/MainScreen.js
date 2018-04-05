import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';



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
    boxwater : {
        flex : 1,
        flexDirection : 'row',
        marginLeft : 10,
        marginRight : 10,
        marginTop : 10,
        marginBottom : 10,
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
        backgroundColor : 'blue'
    }
    
    
})

export default class MainScreen extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
            count : 0,
            colorwater : {
                0 : 0.1,
                1 : 0.1,
                2 : 0.1,
                3 : 0.1,
                4 : 0.1,
                5 : 0.1,
                6 : 0.1,
                7 : 0.1,
            }
        }
    }

    
    render(){
        var imgwater = [];
        
        
        for (let i = 0 ; i < 8 ; i++){
            imgwater.push(
                <View key = {i} style = {styles.boximg}>
                    <TouchableOpacity onPress = {() => {
                        let copyObject = Object.assign({}, this.state.colorwater)
                        for (let j = i ; j >= 0 ; j -- ){
                            copyObject[j.toString()] = 1
                        }
                        for (let k = i+1 ; k < 8 ; k++ ){
                            copyObject[k.toString()] = 0.1
                        }
                        this.setState({
                            colorwater : copyObject
                        })
                    }}>
                        <Image source = {require('../img/water-glasess.png')} style = {{ width : 45 , height : 45}} opacity = {this.state.colorwater[i.toString()]}/>
                    </TouchableOpacity>
                </View>
            )
        }


        return(
            <View style = {styles.container}>

                <View style = {styles.circle}>
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
                            <Text style = {{fontSize : 24}}>1950 / </Text><Text style = {{fontSize : 14}}>3850</Text>
                        </Text>
                        <Text style = {{color : 'white' , fontSize : 15}}>KCal</Text>
                        
                    </PercentageCircle>
                </View>


                <View style = {styles.content}>

                    <View style = {styles.box}>
                        <View style = {styles.boximg}>
                            <Image source = {require('../img/breakfast.png')} style = {{width : 64, height : 64}}/>
                        </View>
                        <View style = {styles.boxtext}>
                            <Text style = {{color : '#858787', fontSize : 18}}>Add! Breakfast</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>Recommend Calrories : 388 KCal</Text>
                        </View>
                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Photo')}} style = {{ backgroundColor : 'red'}}>
                                <View style = {{flex : 1 ,justifyContent : 'center',alignItems : 'center'}}>
                                    <Image source = {require('../img/add.png')} style = {{width : 16, height : 16}}/>
                                </View>
                                
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style = {styles.box}>
                        <View style = {styles.boximg}>
                            <Image source = {require('../img/rice.png') } style = {{width : 64, height : 64}}/>
                        </View>
                        <View style = {styles.boxtext}>
                            <Text style = {{color : '#858787', fontSize : 18}}>Add! Lunch</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>Recommend Calrories : 588 KCal</Text>
                        </View>
                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Photo')}}>
                                <Image source = {require('../img/add.png')} style = {{width : 16, height : 16}}/>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style = {styles.box}>
                        <View style = {styles.boximg}>
                            <Image source = {require('../img/fish.png')} style = {{width : 64, height : 64}}/>
                        </View>
                        <View style = {styles.boxtext}>
                            <Text style = {{color : '#858787', fontSize : 18}}>Add! Dinner</Text>
                            <Text style = {{color : '#858787', fontSize : 12}}>Recommend Calrories : 588 KCal</Text>
                        </View>
                        <View style = {styles.boxadd}>
                            <TouchableOpacity onPress = {() =>{this.props.navigation.navigate('Photo')}}>
                                <Image source = {require('../img/add.png')} style = {{width : 16, height : 16}}/>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style = {styles.boxwater}>
                        { imgwater }
                    </View>

                </View>
            </View>
        );
    }
}