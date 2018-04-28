import React from 'react';
import { connect } from 'react-redux';
import MainScreen from '../Components/MainScreen';
import GetFBAccessTokenAction from '../actions/GetFBAccessTokenAction.js'
import GetFBDataAction from '../actions/GetFBDataAction'
import GetUserFirebaseAction from '../actions/GetUserFirebaseAction.js'
import setMealTimeToAdd from '../actions/setMealTimeToAdd.js'
<<<<<<< HEAD
import setGraphData from '../actions/setGraphData';
=======
import setImageDownloadURLAction from '../actions/setImageDownloadURLAction.js'
>>>>>>> instance2

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
<<<<<<< HEAD
        profile : state.profile
=======
        main : state.main
>>>>>>> instance2
    }
}


export default connect(mapStateToProps,{
    GetFBAccessTokenAction,
    GetFBDataAction,
    GetUserFirebaseAction,
    setMealTimeToAdd,
<<<<<<< HEAD
    setGraphData
=======
    setImageDownloadURLAction
>>>>>>> instance2
})(MainContainer)