import { CREATE_PHOTO_START, CREATE_PHOTO_SUCCESS, CREATE_PHOTO_ERROR } from '../constants';

export default function createPhoto(photo) {
  return async (dispatch, getState, { fetch }) => {
    dispatch({
      type: CREATE_PHOTO_START,
    });
    const state = getState();
    try {
      const response = await fetch('/api/v1/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${state.auth.auth.id_token}`,
        },
        body: JSON.stringify(photo),
      });
      const json = await response.json();
      console.log(json);
      //*
      if (json.status) {
        dispatch({
          type: CREATE_PHOTO_ERROR,
          payload: json,
        });
      } else {
        dispatch({
          type: CREATE_PHOTO_SUCCESS,
          payload: json,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_PHOTO_ERROR,
        payload: {
          status: 100,
          detail: 'Server undermaintain',
        },
      });
      return false;
    }
    return true;
  };
}
