import {
  SET_LOCATION_PATH_VARIABLE,
  CLEAR_LOCATION_PATH_VARIABLE,
} from '../constants';

export default function setLocationPath(state = {}, action) {
  switch (action.type) {
    case SET_LOCATION_PATH_VARIABLE: {
      const locationPath = state.locationPath ? state.locationPath : [];
      locationPath.push(action.locationPath);
      return {
        ...state,
        locationPath,
      };
    }
    case CLEAR_LOCATION_PATH_VARIABLE:
      return {
        ...state,
        locationPath: [],
      };
    default:
      return state;
  }
}
