import{
    GET_INFOR
} from './ActionTypes';

export default function GetInformationAction(data){
    return (dispatch,getState) => {

        dispatch({
            type : GET_INFOR,
            payload_sex : data.sex,
            payload_weight : data.weight,
            payload_height : data.height,
            payload_age : data.age,
            payload_BMR : data.BMR
        })
    }
}
