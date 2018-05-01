import{
    SET_MEAL_TIME
} from './ActionTypes';

export default function setMealTimeToAdd(data){
    return (dispatch) =>{
        dispatch({
            type : SET_MEAL_TIME,
            payload : data
        })
    }
}