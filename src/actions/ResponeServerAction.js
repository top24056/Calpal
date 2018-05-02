import{
    RESPONE_DATA
} from './ActionTypes';
import firebase from 'react-native-firebase';

export default function ResponeServerAction(data){
    return (dispatch) =>{
        let nutrition = firebase.database().ref('nutrition')
        let calories = []
        for (let i = 0 ; i < 4 ; i++){
            let cal = nutrition.child(data[i])
            cal.once('value',function(snapshot){
                console.log(snapshot.val())
                let a = snapshot.val()
                calories.push(a)
            })
        }
        dispatch({
            type : RESPONE_DATA,
            payload : data,
            payload_calories : calories
        })
    }
}