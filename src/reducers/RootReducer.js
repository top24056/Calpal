import {combineReducers} from 'redux';
import CameraReducer from './CameraReducer';
import FoodReducer from './FoodReducer';
import InformationReducer from './InformationReducer';
import MainReducer from './MainReducer';
import FBDataReducer from './FBDataReducer';
import FirebaseReducer from './FirebaseReducer';
import ResponeServerReducer from './ResponeServerReducer';

export default combineReducers({
    camera : CameraReducer,
    food : FoodReducer,
    infor : InformationReducer,
    main : MainReducer,
    fb : FBDataReducer,
    firebase : FirebaseReducer,
    server : ResponeServerReducer
});