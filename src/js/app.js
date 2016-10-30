/**
 * Main file | entry point.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import Directory from './components/Directory'
import '../styles/style.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Directory}>
      // Use wildcard '*' to navigate through folders.
      <Route path="*" component={Directory} />
    </Route>
  </Router>
  ),
  document.getElementById('application')
);
