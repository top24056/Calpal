import{
    DEL_MEAL_ITEM
} from './ActionTypes';
import firebase from 'react-native-firebase'


export default function delMealItem(index, meal){

    let dataObject = new Date()
    let date = dataObject.getDate()
    let month = dataObject.getMonth() + 1
    let year = new Date().getFullYear();
    let strdate = date.toString();
    let strmonth = month.toString();
    let stryear = year.toString();
    let day = strdate + "-" + strmonth + "-" + stryear

    let userId = firebase.auth().currentUser.uid
    let ref = firebase.database().ref('users/' + userId)
    let mealRef = ref.child('food').child(day).child(meal.meal)
    let sumcalRef = ref.child('food').child(day)

    mealRef.once('value', (snapshot) => {
        console.log('fetching meal info')
    }).then((snapshot) => {
        for (i in snapshot.val()) {
            if (snapshot.val()[i].namefood == meal.namefood) {
                mealRef.child(i).remove(() => {
                    console.log('deleted meal item')
                }).catch((err) => {
                    console.log('cannot delete item due to ', err)
                })

                let sumcalint = 0
                sumcalRef.once('value', (snapshot2) => {
                    console.log('fetch sumcal: ', snapshot2.val().sumcal)
                }).then((snapshot3) => {
                    let sumcalRes = snapshot3.val().sumcal - snapshot.val()[i].cal
                    console.log(snapshot3.val().sumcal, '-', snapshot.val()[i].cal, '=', sumcalRes)
                    sumcalRef.update({
                        sumcal : sumcalRes
                    })
                })

                break
            }
        }
    })

    return (dispatch, getState) =>{

        let FlatListMeals = getState().main.downloadImageURL
        FlatListMeals.splice(index, 1)

        dispatch({
            type : DEL_MEAL_ITEM,
            payload : FlatListMeals
        })
    }
}