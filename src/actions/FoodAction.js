import{
    DATA_FOOD
} from './ActionTypes';

export default function FoodAction(data){
    return (dispatch,getState) =>{
        let totalcal = getState().food.total_calperday + data.cal
        dispatch({
            type : DATA_FOOD,
            payload_name : data.name,
            payload_cal : data.cal,
            payload_total : totalcal
        })
    }
}