import assign from 'lodash.assign';
import classNames from 'classnames';
import React from 'react';

import Section from './unit-section';

let lClasses = {
  'grid-unit__left': true,
  'grid-unit--sides': true
};
let rClasses = {
  'grid-unit__right': true,
  'grid-unit--sides': true
};
let bClasses = {
  'grid-unit__bot': true
};


export default class GridUnit extends React.Component {
  render() {
    let props = this.props;
    let leftUnitClasses = classNames(assign({}, lClasses, props.animateInClass));
    let rightUnitClasses = classNames(assign({}, rClasses, props.animateInClass));
    let botUnitClasses = classNames(assign({}, bClasses, props.animateInClass));

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
