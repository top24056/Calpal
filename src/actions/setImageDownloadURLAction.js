import {
    SET_IMG_DL_URL
} from './ActionTypes';
import firebase from 'react-native-firebase';



const hour = new Date().getHours().toString()
const date = new Date().getDate().toString();
const tempmonth = new Date().getMonth() + 1;
const month = tempmonth.toString();
const year = new Date().getFullYear().toString();
const day = date + '-' + month + '-' + year

export default function setImageDownloadURLAction() {
    console.log('action running')
    let tempimage = []
    
    let userId = firebase.auth().currentUser.uid
    let ref = firebase.database().ref('users/' + userId);


    //breakfast new query path gen key from firebase
    let tempbreakfast = []
    let querybreakfast = ref.child('food').child(day).child('breakfast')
    querybreakfast.once('value', function (snapshot) {
        for (let i in snapshot._childKeys) {
            let childpath = querybreakfast.child(snapshot._childKeys[i])
            childpath.once('value', function (childsnapshot) {
                let temppathimage = {
                    namefood: childsnapshot.val().namefood,
                    path: childsnapshot.val().pathimage,
                    cal: childsnapshot.val().cal
                }
                tempimage.push(temppathimage)
            })
        }
    })



    //lunch new query path gen key from firebase
    let templunch = []
    let querylunch = ref.child('food').child(day).child('lunch')
    querylunch.once('value', function (snapshot) {
        for (let i in snapshot._childKeys) {
            let childpath = querylunch.child(snapshot._childKeys[i])
            childpath.once('value', function (childsnapshot) {
                let temppathimage = {
                    namefood: childsnapshot.val().namefood,
                    path: childsnapshot.val().pathimage,
                    cal: childsnapshot.val().cal
                }
                tempimage.push(temppathimage)
            })
        }
    })



    //Dinner new query path gen key from firebase
    let tempdinner = []
    let querydinner = ref.child('food').child(day).child('dinner')
    querydinner.once('value', function (snapshot) {
        for (let i in snapshot._childKeys) {
            let childpath = querydinner.child(snapshot._childKeys[i])
            childpath.once('value', function (childsnapshot) {
                let temppathimage = {
                    namefood: childsnapshot.val().namefood,
                    path: childsnapshot.val().pathimage,
                    cal: childsnapshot.val().cal
                }
                tempimage.push(temppathimage)
            })
        }
    })
    return dispatch => {
        dispatch({
            type: SET_IMG_DL_URL,
            payload: tempimage
        })
    }
}