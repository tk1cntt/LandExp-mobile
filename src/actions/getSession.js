import { SESSION_START, SESSION_SUCCESS, SESSION_ERROR } from '../constants';

export default function getSession() {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: SESSION_START,
    });
    const token = getState().auth.auth && getState().auth.auth.id_token;
    try {
      const response = await fetch('/api/v1/sessions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!token) {
        dispatch({
          type: SESSION_ERROR,
          payload: data,
        });
      } else {
        dispatch({
          type: SESSION_SUCCESS,
          payload: data,
        });
      }
      // console.log(queryResponse.data.getSession); // eslint-disable-line
    } catch (error) {
      dispatch({
        type: SESSION_ERROR,
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
