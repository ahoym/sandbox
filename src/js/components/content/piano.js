import React from 'react';

import generateKeyboard from '../../helpers/generate-keyboard';
import GridUnit from '../grid-unit';


export default class Piano extends React.Component {
  constructor() {
    super();
    this.render = GridUnit.prototype.render.bind(this);
  }

  componentDidMount() {
    this.keyboard = generateKeyboard();
    this.warningBtn = document.querySelector('.piano__lift-warning button');
    this.warningBtn.addEventListener('click', this.removeWarning);
  }

  componentWillUnmount() {
    this.warningBtn.removeEventListener('click', this.removeWarning);
  }

  removeWarning(event) {
    event.preventDefault();
    let warningText = document.querySelector('.piano__lift-warning');
    let warning = document.querySelector('.piano__warning');
    let keyboard = document.querySelector('#keyboard');

    warningText.classList.add('fade-out', 'unclickable');
    warning.classList.add('slide-down-keyboard-cover');

    setTimeout(() => keyboard.removeChild(warning), 500);
  }
}
Piano.defaultProps = {
  middleContent: (
    <div className='grid-unit__mid slide-right piano'>
      <ul>
        <li><h1>I like piano.</h1></li>
        <li>
          <p>
            This keyboard is powered by
            <a href='http://stuartmemo.com/qwerty-hancock/'>QwertyHancock</a>,
            an awesome javascript library that generates a piano interface over
            the W3C‘s
            <a href='http://webaudio.github.io/web-audio-api/'>Web Audio API</a>.
          </p>
        </li>
        <li>
          <p>
            I helped this repo become exportable as a module so users using
            javascript bundlers like browserify (what I use) could require
            QwertyHancock into their files.
          </p>
        </li>
        <li className='piano__lift-warning'>
          <p>
            CAUTION!! Headphone users, playing the keyboard will break your ears!
            Please remove them if you want to live!
          </p>
          <button>I Understand</button>
        </li>
        <li>
          <div id='keyboard' className='slow-fade-in'>
            <div className='piano__warning'></div>
          </div>
        </li>
      </ul>
    </div>
  )
};
