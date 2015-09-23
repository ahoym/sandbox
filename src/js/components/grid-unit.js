import assign from 'lodash.assign';
import classNames from 'classnames';
import React from 'react';

import Section from './unit-section';

let lClasses = {
  'grid-unit__left': true,
  'grid-unit--sides': true,
  'slide-left': true
};
let rClasses = {
  'grid-unit__right': true,
  'grid-unit--sides': true,
  'slide-right': true
};
let bClasses = {
  'grid-unit__bot': true,
  'slide-down': true
};


function assignClasses(destination, baseClasses) {
  let metaClasses = {
    unclickable: !destination,
    hidden: !destination
  };

  let allClasses = assign(metaClasses, baseClasses);

  return classNames(allClasses);
}

export default class GridUnit extends React.Component {
  render() {
    let leftUnitClasses = assignClasses(this.props.leftDest, lClasses);
    let rightUnitClasses = assignClasses(this.props.rightDest, rClasses);
    let botUnitClasses = assignClasses(this.props.botDest, bClasses);

    return (
      <div className='grid-unit fade-in'>
        <Section classNames={leftUnitClasses}
                 destination={this.props.leftDest}
                 symbol='◀'/>
       {this.props.middleContent}
        <Section classNames={rightUnitClasses}
                 destination={this.props.rightDest}
                 symbol='▶'/>
        <Section classNames={botUnitClasses}
                 destination={this.props.botDest}
                 symbol='▼'/>
      </div>
    );
  }
}
GridUnit.propTypes = {
  leftDest: React.PropTypes.string,
  rightDest: React.PropTypes.string,
  botDest: React.PropTypes.string,
  middleContent: React.PropTypes.node
};
