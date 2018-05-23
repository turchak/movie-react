import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
// import createHistory from 'history/createBrowserHistory';
import createHistory from 'history/createHashHistory';

import App from './App';
import Movie from './components/Movie/Movie';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();

ReactDOM.render(
  <Provider store={store} key="provider">
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/movie/:itemId" component={Movie} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
