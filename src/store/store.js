import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/index';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = routerMiddleware(history);
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleware, thunk))
);
