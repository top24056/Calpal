import {
    DATA_FOOD,
    GET_FOOD_BREAKFAST,
    GET_FOOD_LUNCH,
    GET_FOOD_DINNER
} from './../actions/ActionTypes';


const initState = {
    breakfast : {
        name_food : null,
        cal_food : 0,
    },
    lunch : {
        name_food : null,
        cal_food : 0,
    },
    dinner : {
        name_food : null,
        cal_food : 0,
    },
    total_calperday : 0
}

export default function (state = initState, action){
    switch(action.type){
        case DATA_FOOD :
            return Object.assign({}, state,{
                total_calperday : action.payload_total
            })
        case GET_FOOD_BREAKFAST :
            return Object.assign({}, state,{
                breakfast : action.payload
            })
        case GET_FOOD_LUNCH :
            return Object.assign({}, state,{
                lunch : action.payload
            })
        case GET_FOOD_DINNER :
            return Object.assign({}, state,{
                dinner : action.payload
            })
        default : 
            return state;
    }
}