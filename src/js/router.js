import React from 'react';
import { Router, Route, Link } from 'react-router';

import Hero from './components/hero';


export default function (DOMelement) {
  React.render((
    <Router>
      <Route path='/' component={Hero}/>
      <Route path='*' component={Hero}/>
    </Router>
  ), DOMelement);
}
