import {
    SET_IMG_DL_URL
} from './ActionTypes';
import firebase from 'react-native-firebase';
// import setFlatListIsEmpty from './setFlatListIsEmpty';



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
    querybreakfast.once('value',(snapshot) => {

    }).then((snapshot) => {
        for (let i in snapshot._childKeys) {
            let childpath = querybreakfast.child(snapshot._childKeys[i])
            childpath.once('value', (childsnapshot) => {
                if(childsnapshot.val() != null){
                    let refstorage = firebase.storage().ref(childsnapshot.val().pathimage)
                    refstorage.getDownloadURL().then((url) => {
                        let temppathimage = {
                            meal : 'breakfast',
                            namefood: childsnapshot.val().namefood,
                            path: url,
                            cal: childsnapshot.val().cal
                        }
                        tempimage.push(temppathimage)
                    })
                    // setFlatListIsEmpty(false)
                    console.log('BREAKFAST SET IMAGE ACTION')
                }
            })
        }
    })

    //lunch new query path gen key from firebase
    let templunch = []
    let querylunch = ref.child('food').child(day).child('lunch')
    querylunch.once('value', (snapshot) => {

    }).then((snapshot) => {
        for (let i in snapshot._childKeys) {
            let childpath = querylunch.child(snapshot._childKeys[i])
            childpath.once('value', (childsnapshot) => {
                if (childsnapshot.val() != null) {
                    let refstorage = firebase.storage().ref(childsnapshot.val().pathimage)
                    refstorage.getDownloadURL().then((url) => {
                        let temppathimage = {
                            meal: 'lunch',
                            namefood: childsnapshot.val().namefood,
                            path: url,
                            cal: childsnapshot.val().cal
                        }
                        tempimage.push(temppathimage)
                    })
                    // setFlatListIsEmpty(false)
                    console.log('LUNCH SET IMAGE ACTION')

                }
            })
        }
    })

    //Dinner new query path gen key from firebase
    let tempdinner = []
    let querydinner = ref.child('food').child(day).child('dinner')
    querydinner.once('value', (snapshot) => {

    }).then((snapshot) => {
        for (let i in snapshot._childKeys) {
            let childpath = querydinner.child(snapshot._childKeys[i])
            childpath.on('value', (childsnapshot) => {
                if(childsnapshot.val() != null){
                    let refstorage = firebase.storage().ref(childsnapshot.val().pathimage)
                    refstorage.getDownloadURL().then((url) => {
                        let temppathimage = {
                            meal : 'dinner',
                            namefood: childsnapshot.val().namefood,
                            path: url,
                            cal: childsnapshot.val().cal
                        }
                        tempimage.push(temppathimage)
                    })
                    // setFlatListIsEmpty(false)
                    console.log('DINNER SET IMAGE ACTION')
                }
            })
        }
    })

    let refreshing


    // if(tempimage){
    //     setFlatListIsEmpty(false)
    //     console.log('SET TIMEOUT 1')
    //     refreshing = true
    // }
    // else{
    //     setFlatListIsEmpty(true)
    //     console.log('SET TIMEOUT 2')
    //     refreshing = false
    //     }
    
    return dispatch => {
        dispatch({
            type: SET_IMG_DL_URL,
            payload: tempimage,
            paylaod2: refreshing
        })
    }
}