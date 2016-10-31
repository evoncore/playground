import React from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

// Components
import App from './components/App';

const router = (
  <Provider store={store}>
    <Router history={history}>

      <Route path="/" component={App} />

    </Router>
  </Provider>
);

export default router;