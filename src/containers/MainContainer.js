import React from 'react';
import { connect } from 'react-redux';
import MainScreen from '../Components/MainScreen';
import MainAction from '../actions/MainAction';
import GetFBAccessTokenAction from '../actions/GetFBAccessTokenAction.js'
import GetFBDataAction from '../actions/GetFBDataAction'
import GetUserFirebaseAction from '../actions/GetUserFirebaseAction.js'

class MainContainer extends React.Component{
    render(){
        return (
            <MainScreen {...this.props}/>
        )
    }
}


function mapStateToProps(state){
    return{
        food : state.food,
        fb : state.fb,
        firebase : state.firebase,
        infor : state.infor,
    }
}


export default connect(mapStateToProps,{
    MainAction,
    GetFBAccessTokenAction,
    GetFBDataAction,
    GetUserFirebaseAction
})(MainContainer)