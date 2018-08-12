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
      dispatch({
        type: LOGIN_SUCCESS,
        payload: queryResponse,
      });
      window.localStorage.setItem('token', queryResponse.data.login.id_token);
      // history.goBack();
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
