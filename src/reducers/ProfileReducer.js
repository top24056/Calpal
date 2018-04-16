import {
    DATA_PROFILE
} from './../actions/ActionTypes';


const initState = {
    dataprofile : null,
    sumcal : 0
}

export default function (state = initState, action){
    switch(action.type){
        case DATA_PROFILE:
            return Object.assign({}, state,{
                dataprofile : action.payload
            })
        
        default : 
            return state;
    }
}