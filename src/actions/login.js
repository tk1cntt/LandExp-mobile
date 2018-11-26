import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';

export default function login(loginEntity) {
  return async (dispatch, getState, { client, history }) => {
    dispatch({
      type: LOGIN_START,
    });
    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(loginEntity),
      });
      const data = await response.json();
      if (data.status) {
        dispatch({
          type: LOGIN_ERROR,
          payload: data,
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      }
      window.localStorage.setItem('token', data.id_token);
      history.goBack();
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
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
