import React from 'react';
import classnames from 'classnames';


export default React.createClass({
  render: function () {
    var classes = classnames('container');

    return (
      <div className={ classes }>
        <div id='keyboard'></div>
        <p>Hello World!</p>
      </div>
    )
  }
});
