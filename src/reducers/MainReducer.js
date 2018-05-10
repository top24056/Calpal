import {
    PERCENT,
    SET_MEAL_TIME,
    SET_IMG_DL_URL,
    SET_REFRESH,
    DEL_MEAL_ITEM,
    SET_SUMCAL_CIRCLE,
    SET_FLATLIST_IS_EMPTY
} from './../actions/ActionTypes';


const initState = {
    percen : 0,
    Selected_Meal_Time : '',
    login_press : false,
    downloadImageURL : null,
    refreshing : false,
    action_type: '',
    sumcal: 0,
    sumcalCircle: 0,
    flatListIsEmpty: true
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
                downloadImageURL : action.payload,
                refreshing: action.payload2
            })
        case SET_REFRESH :
            return Object.assign({} ,state,{
                refresh : action.payload
            })
        case DEL_MEAL_ITEM:
            return Object.assign({}, state, {
                action_type : action.type,
                downloadImageURL : action.payload
            })
        case SET_SUMCAL_CIRCLE:
            return Object.assign({}, state, {
                action_type : action.type,
                sumcal : action.payload2,
                sumcalCircle : action.payload
            })
        case SET_FLATLIST_IS_EMPTY:
            return Object.assign({}, state, {
                action_type : action.type,
                flatListIsEmpty : action.payload
            })
        default : 
            return state;
    }
}