import {combineReducers} from 'redux';
import CameraReducer from './CameraReducer';
import FoodReducer from './FoodReducer';
import ProfileReducer from './ProfileReducer'

export default combineReducers({
    camera : CameraReducer,
    food : FoodReducer,
    profile : ProfileReducer,
});