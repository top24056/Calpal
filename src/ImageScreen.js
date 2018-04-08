import React from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',

    },
    boximage : {
        flex : 1
    },
    boxcontent : {
        flex : 2,
        backgroundColor : '#f4f9f9',
    },
    boxtext : {
        height : 70,
        backgroundColor : 'white',
        justifyContent : 'center',
        alignItems : 'center',
        padding : 20
    },

})

export default class ImageScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = ({
            nameFood : [
                {
                    name : "ผัดกระเพรา",
                    cal : 600
                },
                {
                    name : "ผัดซีอิ๊ว",
                    cal : 900
                },
                {
                    name : "หมูทอดกระเทียม",
                    cal : 600
                }
            ]
        })
    }
    

    render(){
        var boxnamefood = [];
        for(let i = 0 ; i < 3 ; i++){
            boxnamefood.push(
                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate("Main");
                }}>
                    <View style = {styles.boxtext}>
                        <Text style = {{fontSize : 13}}>
                            <Text>{this.state.nameFood[i].name} </Text>
                            <Text>Calrories : {this.state.nameFood[i].cal}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }


        return(
            <View style = {styles.container}>
                <View style = {styles.boximage}>

                </View>
                <View style = {styles.boxcontent}>
                    {boxnamefood}
                </View>
            </View>
        );
    }
}