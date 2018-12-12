import {
  TOP_ARTICLE_START,
  TOP_ARTICLE_SUCCESS,
  TOP_ARTICLE_ERROR,
} from '../constants';

const INITIAL_STATE = {
  loading: false,
  top: [],
};

export default function top(state = {}, action) {
  if (state === null) {
    // server doesn't suppprt state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case TOP_ARTICLE_START:
      return {
        ...state,
        loading: true,
        top: [],
      };
    case TOP_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        top: action.payload,
      };
    case TOP_ARTICLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        top: [],
      };
    default:
      return state;
  }
}
