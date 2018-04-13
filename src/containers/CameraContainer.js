import React from 'react';
import {connect} from 'react-redux';
import CameraScreen from '../Components/CameraScreen';
import ImageAction from '../actions/ImageAction';

class CameraContainer extends React.Component{

    
    render(){
        return(
            <CameraScreen {...this.props}/>
        );
    }
}


function mapStateToProps(state){
    return {
        image : state.camera
    }
}

export default connect(mapStateToProps,{
    ImageAction
})(CameraContainer)