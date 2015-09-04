'use strict';

var React = require('react');
var classNames = require('classnames');


var Container = React.createClass({
  render: function () {
    var classes = classNames('container');

    return (
      <div className={ classes }>
        <div id='keyboard'></div>
        <p>Hello World!</p>
      </div>
    )
  }
});

module.exports = Container;
