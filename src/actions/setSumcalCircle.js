import{
    SET_SUMCAL_CIRCLE
} from './ActionTypes';

export default function setSumcalCircle(sumcal, BMR){
    let sent_percent
    let percentCircle = (sumcal / BMR) * 100
    if(percentCircle > 100){
        sent_percent = 100
    }
    else{
        sent_percent = percentCircle
    }

    return (dispatch) =>{
        dispatch({
            type : SET_SUMCAL_CIRCLE,
            payload : sent_percent,
            payload2: sumcal
        })
    }
}