import React from 'react';
import { connect } from 'react-redux';
import ProfileScreen from '../Components/ProfileScreen';
import ProfileAction from '../actions/ProfileAction';


class ProfileContainer extends React.Component{


    render(){
        return(
            <ProfileScreen {...this.props}/>
        )
    }
}



function mapStateToProps(state){
    return {
        profile : state.profile

    }
}

export default connect(mapStateToProps,{
    ProfileAction,
})(ProfileContainer)