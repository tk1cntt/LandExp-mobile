import {
  TOP_HOUSE_START,
  TOP_HOUSE_SUCCESS,
  TOP_HOUSE_ERROR,
} from '../constants';

export default function getTop({ page, size }) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: TOP_HOUSE_START,
    });
    try {
      const response = await fetch('/api/v1/houses/top', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      const data = await response.json();
      if (data.status) {
        dispatch({
          type: TOP_HOUSE_ERROR,
          payload: data,
        });
      } else {
        dispatch({
          type: TOP_HOUSE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: TOP_HOUSE_ERROR,
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
