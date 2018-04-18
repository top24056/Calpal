import {combineReducers} from 'redux';
import CameraReducer from './CameraReducer';
import FoodReducer from './FoodReducer';
import InformationReducer from './InformationReducer';
import MainReducer from './MainReducer';
import FBDataReducer from './FBDataReducer';
import FirebaseReducer from './FirebaseReducer';

export default combineReducers({
    camera : CameraReducer,
    food : FoodReducer,
    infor : InformationReducer,
    main : MainReducer,
    fb : FBDataReducer,
    firebase : FirebaseReducer,
});