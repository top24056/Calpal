import{
    DATA_FOOD
} from './ActionTypes';
import firebase from 'react-native-firebase'

export default function FoodAction(data){
    return (dispatch,getState) =>{
        let totalcal = getState().food.total_calperday + data.cal
        let date = new Date().getDate().toString();
        let month = new Date().getMonth().toString();
        let year = new Date().getFullYear().toString();
        let day = date+'-'+month+'-'+year;
        let userId = firebase.auth().currentUser.uid;
        let user = firebase.database().ref('users/' + userId);
        let food = user.child('food');
        let fndate = food.child(day);
        let fnsumcal = {
            'sumcal' : totalcal
        }
        fndate.update(fnsumcal)
        
        dispatch({
            type : DATA_FOOD,
            payload_name : data.name,
            payload_cal : data.cal,
            payload_total : totalcal
        })
    }
}