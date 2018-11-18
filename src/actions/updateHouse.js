import { UPDATE_HOUSE_START, UPDATE_HOUSE_SUCCESS, UPDATE_HOUSE_ERROR } from '../constants';

export default function updateHouse(houseEntity) {
  return async (dispatch, getState, { fetch }) => {
    dispatch({
      type: UPDATE_HOUSE_START,
    });
    const state = getState();
    try {
      //const response = await fetch('/api/v1/houses', {
      const response = await fetch('http://api.tinvang.com.vn/api/houses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${state.auth.auth.id_token}`,
        },
        body: JSON.stringify(houseEntity),
      });
      const json = await response.json();
      console.log(json);
      //*
      if (json.status) {
        dispatch({
          type: UPDATE_HOUSE_ERROR,
          payload: json,
        });
      } else {
        dispatch({
          type: UPDATE_HOUSE_SUCCESS,
          payload: json,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_HOUSE_ERROR,
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
