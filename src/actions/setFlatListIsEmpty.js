import{
    SET_FLATLIST_IS_EMPTY
} from './ActionTypes';


export default function setFlatListIsEmpty(bool){
    console.log('dddddd')
    console.log(bool)
    return dispatch =>{
        dispatch({
            type : SET_FLATLIST_IS_EMPTY,
            payload : bool
        })
    }
}