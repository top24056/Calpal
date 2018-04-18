import {
    GET_FIREBASE_USER_DATA
} from '../actions/ActionTypes';

const initState = {
    user : null,
}

export default function (state = initState, action){
    switch(action.type){
        case GET_FIREBASE_USER_DATA:
            return Object.assign({}, state,{
                user : action.payload,
            })
        
        default : 
            return state;
    }
}