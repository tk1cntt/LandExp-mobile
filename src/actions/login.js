import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';

import mutateLogin from './login.graphql';

export default function login({ usernameOrEmail, password }) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: LOGIN_START,
    });

    try {
      const data = await client.query(
        {
          query: mutateLogin,
          variables: { username: usernameOrEmail, password },
        },
        { cache: false },
      );
      console.log("query response", data); // eslint-disable-line
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      // TODO save token
    } catch (error) {
      console.log('error response', error); // eslint-disable-line
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
