import React from 'react';
import {connect} from 'react-redux';
import ModalLoading from '../Components/ModalLoading';

class ModalContainer extends React.Component{


    render(){
        return(
            <ModalLoading {...this.props}/>
        )
    }
}


function mapStateToProps(state){
    return{
        camera : state.camera,
    }
}


export default connect(mapStateToProps,{

})(ModalContainer)