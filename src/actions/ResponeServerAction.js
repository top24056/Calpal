import{
    RESPONE_DATA
} from './ActionTypes';

export default function ResponeServerAction(data){
    return (dispatch) =>{
        dispatch({
            type : RESPONE_DATA,
            payload : data
        })
    }
}