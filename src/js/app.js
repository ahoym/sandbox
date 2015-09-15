import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Hero from './components/hero';
import Overview from './components/content/overview';

/**
 * Create React component in ES5 fashion because creating an ES6
 * class causes it to not play nicely with react-router.
 */
const App = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    location: React.PropTypes.object
  },

  render: function () {
    let key = this.props.location.pathname;

    return (
      <div>
        <div></div>
        {React.cloneElement(this.props.children || <div />, { key: key })}
      </div>
    );
  }
});

React.render((
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Hero}/>
      <Route path='overview' component={Overview}/>
      <Route path='*' component={Hero}/>
    </Route>
  </Router>
), document.getElementById('app'));
