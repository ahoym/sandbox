import React from 'react';
import classnames from 'classnames';


export default React.createClass({
  render: function () {
    var classes = classnames('hero');

    return (
      <div className={ classes }>
        <div className='hero__mid'>
          <h1 className='hero__name'>Malcolm Ahoy</h1>
          <h2 className='hero__title'>Web Application Developer.</h2>
          <button className='hero__btn'>Click Me</button>
        </div>
      </div>
    )
  }
});
