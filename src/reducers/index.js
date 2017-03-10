import {combineReducers} from 'redux';
import user from './userReducer';
import rooms from './roomsReducer';
import room from './roomReducer';
import messages from './messagesReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  rooms,
  room,
  messages,
  auth,
  ajaxCallsInProgress
});

export default rootReducer;
