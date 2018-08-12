import { SESSION_START, SESSION_SUCCESS, SESSION_ERROR } from '../constants';

import mutateGetSession from './getSession.graphql';

export default function getSession() {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: SESSION_START,
    });
    const token = getState().auth.auth && getState().auth.auth.id_token;
    try {
      const queryResponse = await client.query(
        {
          query: mutateGetSession,
          variables: { token },
        },
        { cache: false },
      );
      dispatch({
        type: SESSION_SUCCESS,
        payload: queryResponse,
      });
    } catch (error) {
      dispatch({
        type: SESSION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
