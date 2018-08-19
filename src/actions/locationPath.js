/* eslint-disable import/prefer-default-export */

import { SET_LOCATION_PATH_VARIABLE } from '../constants';

export function setLocationPath({ locationPath }) {
  return {
    type: SET_LOCATION_PATH_VARIABLE,
    locationPath,
  };
}
