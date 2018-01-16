import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';

import login from '../components/Login/reducer';

const rootReducers = combineReducers({
  // put all of reducers here
  // key: (state,action) => newState
  // you will get data by using 'state.key.xxx'
  login,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
export default createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk)),
);
