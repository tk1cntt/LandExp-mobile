import {
  TOP_HOUSE_START,
  TOP_HOUSE_SUCCESS,
  TOP_HOUSE_ERROR,
} from '../constants';

import mutateGetTop from './getTop.graphql';

export default function getTop({ page, size }) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: TOP_HOUSE_START,
    });
    try {
      const queryResponse = await client.query(
        {
          query: mutateGetTop,
          variables: { page, size },
        },
        { cache: false },
      );
      dispatch({
        type: TOP_HOUSE_SUCCESS,
        payload: queryResponse,
      });
    } catch (error) {
      dispatch({
        type: TOP_HOUSE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
