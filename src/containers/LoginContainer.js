import React from 'react';
import { connect } from 'react-redux';
import LoginScreen from '../Components/LoginScreen';
import GetFBAccessTokenAction from '../actions/GetFBAccessTokenAction.js'
import GetFBDataAction from '../actions/GetFBDataAction'

class LoginContainer extends React.Component{
    render(){
        return (
            <LoginScreen {...this.props}/>
        )
    }
}


function mapStateToProps(state){
    return{
        fb : state.fb,
        profile : state.profile
    }
}


export default connect(mapStateToProps,{
    GetFBAccessTokenAction,
    GetFBDataAction
})(LoginContainer)