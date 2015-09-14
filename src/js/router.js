import React from 'react';
import { Router, Route } from 'react-router';

import Hero from './components/hero';
import Overview from './components/content/overview';


export default function (DOMelement) {
  React.render((
    <Router>
      <Route path='/' component={Hero}/>
      <Route path='overview' component={Overview}/>
      <Route path='*' component={Hero}/>
    </Router>
  ), DOMelement);
}
