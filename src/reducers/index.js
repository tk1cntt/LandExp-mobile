import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import session from './session';
import top from './top';

export default combineReducers({
  auth,
  session,
  top,
  runtime,
});
