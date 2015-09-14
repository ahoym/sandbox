import jest from 'jest';

jest.autoMockOff();


describe('Grid Unit', () => {
  let GridUnit = require('../src/js/components/grid-unit.js');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let gridUnitView;

  beforeEach(() => {
    gridUnitView = TestUtils.renderIntoDocument(
                    <GridUnit middleContent=''/>);
  });

  it('renders a left section', () => {
    let leftSection = TestUtils.findRenderedDOMComponentWithClass(
                        gridUnitView, 'grid-unit__left');
    let leftSectionEl = React.findDOMNode(leftSection);
    // Convert DOM Token List into array
    let lClasses = Array.prototype.slice.call(leftSectionEl.classList, 0);

    expect(leftSectionEl).toBeDefined();
    expect(lClasses).toContain('grid-unit--sides');
  });

  it('renders a right section', () => {
    let rightSection = TestUtils.findRenderedDOMComponentWithClass(
                        gridUnitView, 'grid-unit__right');
    let rightSectionEl = React.findDOMNode(rightSection);
    let rClasses = Array.prototype.slice.call(rightSectionEl.classList, 0);

    expect(rightSectionEl).toBeDefined();
    expect(rClasses).toContain('grid-unit--sides');
  });

  it('renders a bottom (bot) section', () => {
    let botSection = TestUtils.findRenderedDOMComponentWithClass(
                        gridUnitView, 'grid-unit__bot');
    let botSectionEl = React.findDOMNode(botSection);
    let bClasses = Array.prototype.slice.call(botSectionEl.classList, 0);

    expect(botSectionEl).toBeDefined();
    expect(bClasses).not.toContain('grid-unit--sides');
  });
});
