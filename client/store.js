import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// import ROOT reducer
import rootReducer from './reducers/index';

const middleware = applyMiddleware(thunk);

const defaultState = {};

const store = createStore(rootReducer, defaultState, middleware);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;