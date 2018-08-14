import { SESSION_START, SESSION_SUCCESS, SESSION_ERROR } from '../constants';

const INITIAL_STATE = {
  loading: false,
  isAuthenticated: false,
};

export default function session(state = {}, action) {
  if (state === null) {
    // server doesn't suppprt state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case SESSION_START:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        account: null,
      };
    case SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
        account: action.payload.user,
      };
    case SESSION_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload.error,
        account: null,
      };
    default:
      return state;
  }
}
