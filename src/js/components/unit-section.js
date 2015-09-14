import React from 'react';


export default class Section extends React.Component {
  render() {
    return (
      <div className={this.props.classNames}>
        <button>{this.props.symbol}</button>
      </div>
    );
  }
}
Section.propTypes = {
  classNames: React.PropTypes.string,
  symbol: React.PropTypes.string
};
