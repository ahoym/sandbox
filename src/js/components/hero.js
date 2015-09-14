import React from 'react';


export default class Hero extends React.Component {
  handleClick(event) {
    event.preventDefault();
    // can't use HTML5's pushState because react-router is hash based.
    window.location.hash = 'overview';
  }

  render() {
    return (
      <div className='hero'>
        <div className='hero__mid'>
          <h1 className='hero__name'>Malcolm Ahoy</h1>
          <h2 className='hero__title'>Web Application Developer.</h2>
          <button className='hero__btn'
                  onClick={this.handleClick}>
            Get to know me
          </button>
        </div>
      </div>
    );
  }
}
