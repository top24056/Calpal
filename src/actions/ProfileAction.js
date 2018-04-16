import{
    DATA_PROFILE
} from './ActionTypes';

export default function ProfileAction(data){
    return (dispatch,getState) => {

        if(getState().profile.dataprofile.sex === 'male'){
            var bmr = 66 + (getState().profile.dataprofile.weight*13.7) + (5*getState().profile.dataprofile.height) - (6.8*getState().profile.dataprofile.age)
        }
        else if(getState().profile.dataprofile.sex === 'female'){
            var bmr = 66 + (getState().profile.dataprofile.weight*13.7) + (5*getState().profile.dataprofile.height) - (6.8*getState().profile.dataprofile.age)
        }

        let sumcal = getState().profile.dataprofile
        dispatch({
            type : DATA_PROFILE,
            payload : data
        })
    }
}
