import {
    GET_INFOR
} from './../actions/ActionTypes';


const initState = {
    BMR : 0,
    gender : null,
    height : null,
    weight : null,
    age : null,
}

export default function (state = initState, action){
    switch(action.type){
        case GET_INFOR:
            return Object.assign({}, state,{
                gender : action.payload_gender,
                height : action.payload_height,
                weight : action.payload_weight,
                age : action.payload_age,
                BMR : action.payload_BMR
            })
        
        default : 
            return state;
    }
}