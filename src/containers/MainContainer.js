import React from 'react';
import { connect } from 'react-redux';
import MainScreen from '../Components/MainScreen';

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
        profile : state.profile,
    }
}


export default connect(mapStateToProps)(MainContainer)