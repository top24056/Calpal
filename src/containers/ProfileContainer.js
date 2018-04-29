import React from 'react'
import { connect } from 'react-redux'
import ProfileScreen from '../Components/ProfileScreen'
import GetInformationAction from '../actions/GetInformationAction'
import firebase from 'react-native-firebase'
import setGraphData from '../actions/setGraphData'

class ProfileContainer extends React.Component{

    componentWillMount(){
        
    }

    render(){
        return(
            <ProfileScreen {...this.props}/>
        )
    }
}



function mapStateToProps(state){
    return {
        infor : state.infor,
        fb : state.fb,
        profile : state.profile
    }
}

export default connect(mapStateToProps,{
    GetInformationAction,
    setGraphData
})(ProfileContainer)