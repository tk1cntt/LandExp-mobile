import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';

import mutateLogin from './login.graphql';

export default function login({ usernameOrEmail, password }) {
  return async (dispatch, getState, { client, history }) => {
    dispatch({
      type: LOGIN_START,
    });
    console.log('login-history', history); // eslint-disable-line
    try {
      const queryResponse = await client.query(
        {
          query: mutateLogin,
          variables: { username: usernameOrEmail, password },
        },
        { cache: false },
      );
      const data = queryResponse.data.login;
      if (data.error) {
        dispatch({
          type: LOGIN_ERROR,
          payload: data.error,
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
