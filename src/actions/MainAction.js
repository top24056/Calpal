import {
    PERCENT
} from './ActionTypes'


export default function MainAction(){
    return (dispatch,getState) => {
        let percen = (getState().food.total_calperday/getState().profile.sumcal) * 100


        dispatch({
            type : PERCENT,
            payload : percen
        })
    }
}