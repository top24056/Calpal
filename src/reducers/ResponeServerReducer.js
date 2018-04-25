import {
    RESPONE_DATA
} from '../actions/ActionTypes';

const initState = {
    data_server : null,
}

export default function (state = initState, action){
    switch(action.type){
        case RESPONE_DATA:
            return Object.assign({}, state,{
                data_server : action.payload,
            })
        
        default : 
            return state;
    }
}