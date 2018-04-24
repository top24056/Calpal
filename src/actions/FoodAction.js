import{
    DATA_FOOD
} from './ActionTypes';
import firebase from 'react-native-firebase'

export default function FoodAction(data){
    return (dispatch,getState) =>{

        
        console.log(data)
        
        
        dispatch({
            type : DATA_FOOD,
            payload_total : data.cal
        })
    }
}