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


export default React.createClass({
  render: function () {
    let props = this.props;
    let leftUnitClasses = classNames(assign({}, lClasses, props.lClasses));
    let rightUnitClasses = classNames(assign({}, rClasses, props.rClasses));
    let botUnitClasses = classNames(assign({}, bClasses, props.bClasses));
    console.log(props.middleContent);

    return (
      <div className='grid-unit'>
        <Section classNames={leftUnitClasses} symbol='&larr;'/>
        {props.middleContent}
        <Section classNames={rightUnitClasses} symbol='&rarr;'/>
        <Section classNames={botUnitClasses} symbol='&darr;'/>
      </div>
    )
  }
});
