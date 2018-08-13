import {
  TOP_HOUSE_START,
  TOP_HOUSE_SUCCESS,
  TOP_HOUSE_ERROR,
} from '../constants';

const INITIAL_STATE = {
  loading: false,
};

export default function top(state = {}, action) {
  if (state === null) {
    // server doesn't suppprt state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case TOP_HOUSE_START:
      return {
        ...state,
        loading: true,
        top: null,
      };
    case TOP_HOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        top: action.payload,
      };
    case TOP_HOUSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        top: null,
      };
    default:
      return state;
  }
}
