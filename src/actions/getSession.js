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
      const data = queryResponse.data.getSession;
      if (data.error) {
        dispatch({
          type: SESSION_ERROR,
          payload: data.error,
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
