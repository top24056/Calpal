import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { Madoka, Makiko } from 'react-native-textinput-effects';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    boxprofilehead : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#0094ff',
    },
    boxprofile : {
        flex : 2.5,
        flexDirection : 'column',
    },
    boximage : {

    },
    box : {
        flex : 1,
        flexDirection : 'column',
        margin : 20
    },
    boxtext : {
        flex : 1,
    },
    boxrow : {
        flex : 1,
        flexDirection : 'row',
    }
    
})



export default class ProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            weigth : null,
            height : null,
            bmr : null,
            age : null
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.boxprofilehead}>
                    {/* <View style = {styles.boximage}>
                        <Image
                            source = {} 
                        />
                    </View> */}
                </View>
                <View style = {styles.boxprofile}>
                    <View style = {styles.box}>
                        <View style = {styles.boxrow}>
                            <View style = {{flex : 1,margin : 10}}>
                                <Madoka 
                                    label = {'Height'}
                                    borderColor = {'#0094ff'}
                                    labelStyle = {{color : '#0094ff'}}
                                    inputStyle = {{color : '#0094ff'}}
                                    onChangeText = {(height) => this.setState({height})}
                                    value = {this.state.height}
                                />
                            </View>
                            <View style = {{flex : 1,margin : 10}}>
                                <Madoka
                                    label = {'Weigth'}
                                    borderColor = {'#0094ff'}
                                    labelStyle = {{color : '#0094ff'}}
                                    inputStyle = {{color : '#0094ff'}}
                                    onChangeText = {(weigth) => this.setState({weigth})}
                                    value = {this.state.weigth}
                                />
                            </View>
                        </View>
                        <View style = {styles.boxrow}>
                            <View style = {{flex : 1,margin : 10}}>
                                <Madoka
                                    label = {'Age'}
                                    borderColor = {'#0094ff'} 
                                    labelStyle = {{color : '#0094ff'}}
                                    inputStyle = {{color : '#0094ff'}}
                                    onChangeText = {(age) => this.setState({age})}
                                    value = {this.state.age}
                                />
                            </View>
                            <View style = {{flex : 1,margin : 10}}>
                                <Madoka
                                    label = {'BMR'}
                                    borderColor = {'#0094ff'}
                                    labelStyle = {{color : '#0094ff'}}
                                    inputStyle = {{color : '#0094ff'}}
                                    onChangeText = {(BMR) => this.setState({BMR})}
                                    value = {this.state.BMR}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}