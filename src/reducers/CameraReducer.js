import {
    ADD_IMAGE
} from './../actions/ActionTypes';


const initState = {
    image_food : null
}

export default function (state = initState, action){
    switch(action.type){
        case ADD_IMAGE:
            return Object.assign({}, state,{
                image_food : action.payload
            })
        
        default : 
            return state;
    }
}