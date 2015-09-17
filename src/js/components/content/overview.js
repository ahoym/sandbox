import React from 'react';

import GridUnit from '../grid-unit';


export default class Overview extends React.Component {
  constructor() {
    super();
    this.render = GridUnit.prototype.render.bind(this);
  }
}
Overview.defaultProps = {
  animateInClass: {
    'slide-up': true
  },
  middleContent: (
    <div className='grid-unit__mid slide-up'>
      <ul>
        <li>
          <h1>A Simple Overview</h1>
        </li>
        <li>
          I was a Web Application Engineer at Yola, Inc. from
          June 2014 - August 2015. I mostly worked on the complex
          client-side of their easy-to-use website making application.
        </li>
        <li>
          A simple mantra I follow is to make my code as clean and simple
          as possible. The most impactful advice I distinctly remember is:
          <i>"It's harder to read code than to write it."</i>
        </li>
        <li>
          I like learning. I like javascript. I'm a space enthusiast.
          I like playing piano. I like basketball. I like video games.
          I like burgers.
        </li>
      </ul>
    </div>
  )
};
