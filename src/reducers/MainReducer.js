import {
    PERCENT,
    SET_MEAL_TIME,
    SET_IMG_DL_URL,
    SET_REFRESH
} from './../actions/ActionTypes';


const initState = {
    percen : 0,
    Selected_Meal_Time : '',
    login_press : false,
    downloadImageURL : null,
    refresh : false 
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
        case SET_IMG_DL_URL:
            return Object.assign({}, state,{
                mealDataArr : action.payload
            })
        case SET_REFRESH :
            return Object.assign({} ,state,{
                refresh : action.payload
            })
        default : 
            return state;
    }
}