import {
    SET_GRAPH_DATA
} from './ActionTypes';
import firebase from 'react-native-firebase'


export default function setGraphdata() {

    let tempdate = new Date();
    tempdate.setDate(tempdate.getDate() - 6)
    let date = tempdate.getDate()
    let datequ = tempdate.getDate()
    let month = tempdate.getMonth() + 1
    let newmonth = month
    let year = new Date().getFullYear();
    let data = []
    let dataday = []
    let test = []
    // let forquery = []
    let userId = firebase.auth().currentUser.uid
    let ref = firebase.database().ref('users/' + userId)
    roundloop = 7
    let wait = true
    console.log('before loop tempdate',tempdate)
    console.log('before loop date',date)
    console.log('before loop datequ',datequ)
    while (roundloop > 0) {
        let strdate = datequ.toString();
        let strmonth = newmonth.toString();
        let stryear = year.toString();
        let day = strdate + "-" + strmonth + "-" + stryear
        console.log('in loop',day)
        dataday.push(date)
        let queryday = ref.child("food").child(day).child("sumcal")
        // forquery.push(queryday)
        datequ = datequ + 1
        date = date + 1
        console.log(day)
        queryday.on('value', function (snapshot) {
        queryday.on('value', (snapshot) => {
            if (snapshot.val() == null) {
                data.push(0)
            }
            else {
                data.push(snapshot.val())
                // test.push({
                //     'day': day,
                //     'cal' : snapshot.val()
                // })
            }
        // }).then((snapshot) => {
        //     if (snapshot.val() == null) {
        //         data.push(0)
        //     }
        //     else {
        //         data.push(snapshot.val())
        //         test.push({
        //             'day': day,
        //             'cal': snapshot.val()
        //         })
        //     }
        })

        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            if (date >= 32) {
                datequ -= 31
                if (month >= 12) {
                    newmonth = 1
                    year = year + 1
                }
                else {
                    newmonth = newmonth + 1
                }
            }
        }
        else if (month === 2) {
            if (year % 4 === 0) {
                datequ = 29
            }
            else {
                datequ = 28
            }
            month = 3
        }
        else {
            if (date == 31) {
                datequ = 1
                newmonth = newmonth + 1
            }
        }

        roundloop = roundloop - 1

    }



return dispatch => {
    dispatch({
        type: SET_GRAPH_DATA,
        payload: data,
        payload_2: dataday,
    })
}
}