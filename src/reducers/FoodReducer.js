import {
    DATA_FOOD,
} from './../actions/ActionTypes';


const initState = {
    name_food : null,
    cal_food : 0,
    total_calperday : 0
}

export default function (state = initState, action){
    switch(action.type){
        case DATA_FOOD :
            return Object.assign({}, state,{
                name_food : action.payload_name,
                cal_food : action.payload_cal,
                total_calperday : action.payload_total
            })
        default : 
            return state;
    }
}