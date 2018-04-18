import React from 'react';
import { connect } from 'react-redux';
import ProfileScreen from '../Components/ProfileScreen';
import GetInformationAction from '../actions/GetInformationAction';

class ProfileContainer extends React.Component{


    render(){
        return(
            <ProfileScreen {...this.props}/>
        )
    }
}



function mapStateToProps(state){
    return {
        infor : state.infor,
        fb : state.fb
    }
}

export default connect(mapStateToProps,{
    GetInformationAction,
})(ProfileContainer)