import React from 'react';
import {connect} from 'react-redux';
import ImageScreen from '../Components/ImageScreen';

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
    }
}


export default connect(mapStateToProps)(ImageContainer)