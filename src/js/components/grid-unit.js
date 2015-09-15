import assign from 'lodash.assign';
import classNames from 'classnames';
import React from 'react';

import Section from './unit-section';

let lClasses = {
  'slide-up': true,
  'grid-unit__left': true,
  'grid-unit--sides': true
};
let rClasses = {
  'slide-up': true,
  'grid-unit__right': true,
  'grid-unit--sides': true
};
let bClasses = {
  'slide-up': true,
  'grid-unit__bot': true
};


export default class GridUnit extends React.Component {
  render() {
    let props = this.props;
    let leftUnitClasses = classNames(assign({}, lClasses, props.lClasses));
    let rightUnitClasses = classNames(assign({}, rClasses, props.rClasses));
    let botUnitClasses = classNames(assign({}, bClasses, props.bClasses));

    return (
      <div className='grid-unit fade-in'>
        <Section classNames={leftUnitClasses} symbol='&larr;'/>
        {props.middleContent}
        <Section classNames={rightUnitClasses} symbol='&rarr;'/>
        <Section classNames={botUnitClasses} symbol='&darr;'/>
      </div>
    );
  }
}
