import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#0094ff',
    }
})

export default class ModalLoading extends React.Component{

    constructor(props){
        super(props);
        this.state = ({
            visible : true,
        })
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                visible: false
            });
        
        }, 3000);
        this.props.navigation.navigate("Image");
      }

    render(){
        return(
            <View style = {styles.container}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            </View>
        );
    }
}
