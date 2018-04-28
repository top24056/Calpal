import{
    SET_GRAPH_DATA
} from './ActionTypes';
import firebase from 'react-native-firebase'


export default function setGraphdata(){

    let date = new Date().getDate()-6;
    let month = new Date().getMonth()+1;
    let year = new Date().getFullYear();
    let date7
    let month7
    let data = []
    let dataday = []
    let userId = firebase.auth().currentUser.uid
    let ref = firebase.database().ref('users/' + userId)
    roundloop = 7
    while(roundloop > 0){
        let strdate = date.toString();
        let strmonth = month.toString();
        let stryear = year.toString();
        let day = strdate+"-"+strmonth+"-"+stryear
        console.log('dd'+day)
        dataday.push(date)
        let queryday = ref.child("food").child(day).child("sumcal")
        queryday.on('value',function(snapshot){
            if(snapshot.val() == null){
                data.push(0)
            }
            else{
                data.push(snapshot.val())
            }
        })



        date = date + 1
        if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12){
            if(date == 31){
                date = 1
                if(month >= 12){
                    month = 1
                    year = year + 1
                }
                else{
                    month = month + 1
                }
            }
        }
        else if(month === 2){
            if(year % 4 === 0){
                date = 29
            }
            else{
                date = 28
            }
            month = 3
        }
        else{
            if(date == 30){
                date = 1
                month = month + 1
            }
        }
        
        // if(date === 0){
        //     month = month - 1
        //     if(month === 0){
        //         month = 12
        //         date = 31
        //     }
        //     else if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10){
        //         date = 31
        //     }
        //     else if(month === 2){
        //         if(year % 4 === 0){
        //             date = 29
        //         }
        //         else{
        //             date = 28
        //         }
        //     }
        //     else{
        //         date = 31
        //     }
        // }
        roundloop = roundloop - 1
    }
    setTimeout( () => {
        console.log('data', data)
    }, 1500)    

    return dispatch =>{
        dispatch({
            type : SET_GRAPH_DATA,
            payload : data,
            payload_2 : dataday,
            // payload_month : month,
            // payload_year : year,
            // payload_day7 : date7,
            // payload_month7 : month7,
        })
    }
}