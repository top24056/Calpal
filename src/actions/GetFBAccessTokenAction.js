import{
    GET_FB_TOKEN
} from './ActionTypes';

export default function GetFBAccessTokenAction(data){
    return (dispatch,getState) =>{
        dispatch({
            type : GET_FB_TOKEN,
            payload : data,
        })
    }
}