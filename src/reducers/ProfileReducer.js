import {
    SET_GRAPH_DATA
} from '../actions/ActionTypes';

const initState = {
    graphData : null,
    graphDataXAxis : [],
    graphDataYAxis : []
}

export default function (state = initState, action){
    switch(action.type){
        case SET_GRAPH_DATA:
            return Object.assign({}, state,{
                graphDataXAxis : action.payload_2,
                graphDataYAxis : action.payload
            })
        
        default : 
            return state;
    }
}