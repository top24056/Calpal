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
import FBSDK ,{
    LoginManager
} from 'react-native-fbsdk';

const styles = StyleSheet.create({
    container : {
        flex : 1
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
        // backgroundColor : 'blue',
        justifyContent : 'center',
        // alignItems : 'center'
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
            dataprofile : {
                weight : null,
                height : null,
                age : null,
                sex : null
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
                    let dataprofilecopy = JSON.parse(JSON.stringify(this.state.dataprofile))
                    dataprofilecopy.weight = text
                    this.setState({
                        dataprofile : dataprofilecopy
                    })
                    this.props.ProfileAction(this.state.dataprofile);
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
                onChangeText = {(text) => {
                    let dataprofilecopy = JSON.parse(JSON.stringify(this.state.dataprofile))
                    dataprofilecopy.height = text
                    this.setState({
                        dataprofile : dataprofilecopy
                    })
                    this.props.ProfileAction(this.state.dataprofile);
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
                onChangeText = {(text) => {
                    let dataprofilecopy = JSON.parse(JSON.stringify(this.state.dataprofile))
                    dataprofilecopy.age = text
                    this.setState({
                        dataprofile : dataprofilecopy
                    })
                    this.props.ProfileAction(this.state.dataprofile);
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
                                xlarge
                                rounded
                                source = {{uri : this.props.profile.dataprofile.picture.data.url}}
                            />
                        </View>
                        <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center',margin : 10}}>
                            <Text style = {{color : 'white',fontSize : 20}}>{this.props.profile.dataprofile.name}</Text>
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
                                        let dataprofilecopy = JSON.parse(JSON.stringify(this.state.dataprofile))
                                        dataprofilecopy.sex = data
                                        this.setState({
                                            dataprofile : dataprofilecopy
                                        })
                                        this.props.ProfileAction(this.state.dataprofile);
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