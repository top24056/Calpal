import{
    PERCENT
} from './ActionTypes';
import firebase from 'react-native-firebase'

const hour = new Date().getHours().toString()
const date = new Date().getDate().toString();
const tempmonth = new Date().getMonth()+1;
const month = tempmonth.toString();
const year = new Date().getFullYear().toString();
const day = date+'-'+month+'-'+year;

export default function setPercentAction(bmr = 0){
    console.log('in action')
    let percent
    let Bmr = bmr
    let sumcal = 0
    let userId = firebase.auth().currentUser.uid
    let ref = firebase.database().ref('users/' + userId);
    let food = ref.child('food').child(day)
    let pathprofile = ref.child('profile')
    food.once('value', function (data) {
        if (data.val() === null) {
            console.log('No food photo on this day (', day, ') yet.')
        }
        else {
            if (data.val().sumcal != null) {
                sumcal = data.val().sumcal
            }
        }
    }).then(function(data){
        pathprofile.once('value', function (data) {
            if (data.val() === null) {}
            else {
                if (data.val().BMR) {
                    bmr = data.val().BMR
                }
                percent = (sumcal/Bmr) * 100
            }
        })
        percent = (sumcal/Bmr) * 100
    })
    

    return (dispatch) =>{
        dispatch({
            type : PERCENT,
            payload : percent
        })
    }
}