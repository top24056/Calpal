import{
    ADD_IMAGE
} from './ActionTypes';


export default function ImageAction(data){
    return dispatch =>{
        dispatch({
            type : ADD_IMAGE,
            payload : data.uri
        })
    }
}