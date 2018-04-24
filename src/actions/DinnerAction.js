import{
    GET_FOOD_DINNER
} from './ActionTypes';


export default function DinnerAction(data){
    return dispatch =>{
        dispatch({
            type : GET_FOOD_DINNER,
            payload : data
        })
    }
}