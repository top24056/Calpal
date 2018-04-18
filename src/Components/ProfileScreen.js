import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Sae  } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    RaisedTextButton
} from 'react-native-material-buttons';
import FBSDK ,{
    LoginManager
} from 'react-native-fbsdk';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,.05)',
    },
    boxprofile : {
        flex : 1,
        backgroundColor : '#0094ff',
        flexDirection : 'column',
        paddingTop : 18
    },
    boxprofileimage : {
        flex : 1.5,
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
                sex : null,
                BMR : 0
            }
        }
    }


 

    render(){


        const weightinput = (
            <Sae 
                label = {'Weight'}
                labelStyle = {{backgroundColor : 'red'}}
                labelStyle = {{color : '#0094ff'}}
                borderColor = {'#0094ff'}
                iconClass={FontAwesomeIcon} 
                iconName={'pencil'}
                iconColor={'#0094ff'}
                inputStyle = {{color : '#0094ff'}}
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
            <Sae 
                label = {'Height'}
                labelStyle = {{color : '#0094ff'}}
                borderColor = {'#0094ff'}
                iconClass={FontAwesomeIcon} 
                iconName={'pencil'}
                iconColor={'#0094ff'}
                inputStyle = {{color : '#0094ff'}}
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
            <Sae 
                label = {'Age'}
                labelStyle = {{color : '#0094ff'}}
                borderColor = {'#0094ff'}
                iconClass={FontAwesomeIcon} 
                iconName={'pencil'}
                iconColor={'#0094ff'}
                inputStyle = {{color : '#0094ff'}}
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

        const sex = [
            {
                value : 'male',
            },
            {
                value : 'female'
            }
        ];

        

        return(
            <KeyboardAwareScrollView style={styles.container}>
            {/* <View style = {styles.container}> */}
                <View style = {styles.boxprofile}>
                    <View style = {styles.boxprofileimage}>
                        <View style = {{flex : 3,justifyContent : 'flex-end',alignItems : 'center',}}>
                            <Avatar
                                large
                                rounded
                                source = {{uri : this.props.fb.data_profile.picture.data.url}}
                            />
                        </View>
                        <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center',margin : 10}}>
                            <Text style = {{color : 'white',fontSize : 20}}>{this.props.fb.data_profile.name}</Text>
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
                                <Dropdown
                                    label = 'Sex'
                                    data = {sex}
                                    textColor = '#0094ff'
                                    baseColor = '#0094ff'
                                    onChangeText = {(data) => {
                                        let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                                        informationcopy.sex = data
                                        this.setState({
                                            information : informationcopy
                                        })
                                    }}
                                />
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
                                       
                                        if(this.state.information.sex === 'male'){
                                            this.state.information.BMR = 66 + (this.state.information.weight*13.7) + (5*this.state.information.height) - (6.8*this.state.information.age)
                                        }
                                        else if(this.state.information.sex === 'female'){
                                            this.state.information.BMR = 66 + (this.state.information.weight*13.7) + (5*this.state.information.height) - (6.8*this.state.information.age)
                                        }
                                        this.props.GetInformationAction(this.state.information)
                                    }}
                                />
                            </View>
                        </View>

                        
                    </View>
                    
                </View>

                <View style = {styles.boxgraph}>
                </View>

            {/* </View> */}
            </KeyboardAwareScrollView>
        );
    }
}