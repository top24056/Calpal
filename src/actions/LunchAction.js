import{
    GET_FOOD_LUNCH
} from './ActionTypes';


export default function LunchAction(data){
    return dispatch =>{
        dispatch({
            type : GET_FOOD_LUNCH,
            payload : data
        })
    }
}