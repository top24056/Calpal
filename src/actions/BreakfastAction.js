import{
    GET_FOOD_BREAKFAST
} from './ActionTypes';


export default function BreakfastAction(data){
    return dispatch =>{
        dispatch({
            type : GET_FOOD_BREAKFAST,
            payload : data
        })
    }
}