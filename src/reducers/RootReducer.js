import {combineReducers} from 'redux';
import CameraReducer from './CameraReducer';
import FoodReducer from './FoodReducer';
import ProfileReducer from './ProfileReducer'
import MainReducer from './MainReducer';
import FBDataReducer from './FBDataReducer';

export default combineReducers({
    camera : CameraReducer,
    food : FoodReducer,
    profile : ProfileReducer,
    main : MainReducer,
    fb : FBDataReducer
});