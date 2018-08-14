import { SETTING_SUCCESS } from '../constants';

const INITIAL_STATE = {
  widthScreen: 600,
  heightScreen: 800,
  currentLocation: '/',
};

export default function setting(state = {}, action) {
  if (state === null) {
    // server doesn't suppprt state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case SETTING_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
