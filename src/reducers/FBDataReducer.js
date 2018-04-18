import {
    GET_FB_TOKEN,
    GET_FB_DATA
} from './../actions/ActionTypes';


const initState = {
    token : null,
    data_profile : {
        name : "Guess",
        picture : {
            data : {
                url : "https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg"
            }
        }
    }
}

export default function (state = initState, action){
    switch(action.type){
        case GET_FB_TOKEN:
            return Object.assign({}, state,{
                token : action.payload,
            })
        case GET_FB_DATA:
            return Object.assign({}, state,{
                data_profile : action.payload,
            })
        
        default : 
            return state;
    }
}