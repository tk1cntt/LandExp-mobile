import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import session from './session';

export default combineReducers({
  auth,
  session,
  runtime,
});
