import {
  SET_IMG_DL_URL
} from './ActionTypes';


export default function setImageDownloadURLAction(url) {
  return dispatch => {
    dispatch({
      type: SET_IMG_DL_URL,
      payload: url
    })
  }
}