import {
    PERCENT,
    SET_MEAL_TIME
} from './../actions/ActionTypes';


const initState = {
    percen : 0,
    Selected_Meal_Time : '',
    login_press : false
}

export default function (state = initState, action){
    switch(action.type){
        case PERCENT:
            return Object.assign({}, state,{
                percen : action.payload
            })

        case SET_MEAL_TIME:
            return Object.assign({}, state,{
                Selected_Meal_Time : action.payload
            })
        default : 
            return state;
    }
}