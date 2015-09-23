import React from 'react';


export default class Section extends React.Component {
  render() {
    return (
      <div className={this.props.classNames}>
        <button onClick={this.switchView.bind(this)}>
          {this.props.symbol}
        </button>
      </div>
    );
  }

  switchView() {
    window.location.hash = this.props.destination;
  }
}
Section.propTypes = {
  classNames: React.PropTypes.string,
  destination: React.PropTypes.string,
  symbol: React.PropTypes.string
};
