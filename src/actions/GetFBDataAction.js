import{
    GET_FB_DATA
} from './ActionTypes';

export default function GetFBDataAction(data){
        
    return (dispatch,getState) =>{
        
        dispatch({
            type : GET_FB_DATA,
            payload : data,
        })
    }
}