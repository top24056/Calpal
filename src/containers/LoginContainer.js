import React from 'react';
import { connect } from 'react-redux';
import LoginScreen from '../Components/LoginScreen';
import GetFBAccessTokenAction from '../actions/GetFBAccessTokenAction.js'
import GetFBDataAction from '../actions/GetFBDataAction'
import GetUserFirebaseAction from '../actions/GetUserFirebaseAction.js'
import setGraphData from '../actions/setGraphData';
import setImageDownloadURLAction from '../actions/setImageDownloadURLAction'
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
        firebase : state.firebase,
        main : state.main,
        profile : state.profile
    }
}


export default connect(mapStateToProps,{
    GetFBAccessTokenAction,
    GetFBDataAction,
    GetUserFirebaseAction,
    setGraphData,
    setImageDownloadURLAction
})(LoginContainer)