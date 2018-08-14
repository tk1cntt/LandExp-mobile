import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';

const INITIAL_STATE = {
  loading: false,
  isAuthenticated: false,
};

export default function auth(state = {}, action) {
  if (state === null) {
    // server doesn't suppprt state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        auth: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
        auth: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        auth: null,
      };
    default:
      return state;
  }
}
