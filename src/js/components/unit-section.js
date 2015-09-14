import React from 'react';


export default React.createClass({
  render: function () {
    return (
      <div className={this.props.classNames}>
        <button>{this.props.symbol}</button>
      </div>
    )
  }
});
