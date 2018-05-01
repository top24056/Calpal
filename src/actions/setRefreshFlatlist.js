import{
    SET_REFRESH
} from './ActionTypes';

export default function setRefreshFlatlist(data){
    return (dispatch) =>{
        dispatch({
            type : SET_REFRESH,
            payload : data
        })
    }
}