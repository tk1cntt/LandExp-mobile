import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import session from './session';
import top from './top';
import setting from './setting';
import locationPath from './locationPath';
import house from './house';

export default combineReducers({
  auth,
  session,
  top,
  setting,
  runtime,
  locationPath,
  house,
});
