import{
    GET_FIREBASE_USER_DATA
} from './ActionTypes';

export default function GetUserFirebaseAction(data){
        
    return (dispatch,getState) =>{
        
        dispatch({
            type : GET_FIREBASE_USER_DATA,
            payload : data,
        })
    }
}