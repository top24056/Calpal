import {
    DATA_PROFILE,
    GET_FB_DATA,
    
} from './../actions/ActionTypes';


const initState = {
    dataprofile : {
        name : "Guess",
        picture : {
            data : {
                url : "https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg"
            }
        }
    },
    sumcal : 0,
    init_profile : null
}

export default function (state = initState, action){
    switch(action.type){
        case DATA_PROFILE:
            return Object.assign({}, state,{
                dataprofile : action.payload,
                sumcal : action.payload_cal
            })
        case GET_FB_DATA:
            return Object.assign({}, state,{
                dataprofile : action.payload,
            })

        default : 
            return state;
    }
}