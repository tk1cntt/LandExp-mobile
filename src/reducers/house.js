import { UPDATE_HOUSE_START, UPDATE_HOUSE_SUCCESS, UPDATE_HOUSE_ERROR } from '../constants';

const INITIAL_STATE = {
  loading: false,
};

export default function auth(state = {}, action) {
  if (state === null) {
    // server doesn't suppprt state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case UPDATE_HOUSE_START:
      return {
        ...state,
        loading: true,
        house: null,
      };
    case UPDATE_HOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        house: action.payload,
      };
    case UPDATE_HOUSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        house: null,
      };
    default:
      return state;
  }
}
