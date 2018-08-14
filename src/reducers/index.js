import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import session from './session';
import top from './top';
import setting from './setting';

export default combineReducers({
  auth,
  session,
  top,
  setting,
  runtime,
});
