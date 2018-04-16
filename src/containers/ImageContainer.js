import React from 'react';
import {connect} from 'react-redux';
import ImageScreen from '../Components/ImageScreen';
import FoodAction from '../actions/FoodAction';

class ImageContainer extends React.Component{


    render(){
        return(
            <ImageScreen {...this.props}/>
        )
    }
}


function mapStateToProps(state){
    return{
        image : state.camera,
        food : state.food
    }
}


export default connect(mapStateToProps,{
    FoodAction
})(ImageContainer)