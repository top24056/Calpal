import {
    PERCENT
} from './../actions/ActionTypes';


const initState = {
    percen : 0,
    login_press : false
}

export default function (state = initState, action){
    switch(action.type){
        case PERCENT:
            return Object.assign({}, state,{
                percen : action.payload
            })
        default : 
            return state;
    }
}