import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import reduxStore from './Redux/store';

// ReactDOM.render(<App />, document.getElementById('root'));

const composeEnchancers =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(reduxStore, composeEnchancers(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route render={props => <App {...props} />} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
