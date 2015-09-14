import jest from 'jest';

jest.autoMockOff();

describe('Unit Section', () => {
  let UnitSection = require('../src/js/components/unit-section.js');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let unitSectionView;

  beforeEach(() => {
    unitSectionView = TestUtils.renderIntoDocument(
                        <UnitSection classNames='foobar'
                                     symbol='barfoo' />);
  });

  it('renders a section (specified by its classnames)', () => {
    let div = TestUtils.findRenderedDOMComponentWithTag(
                unitSectionView, 'div');
    let divEl = React.findDOMNode(div);

    expect(divEl).toBeDefined();
    expect(divEl.className).toBe('foobar');
  });

  it('renders a button to go to the next grid unit', () => {
    let btn = TestUtils.findRenderedDOMComponentWithTag(
                unitSectionView, 'button');
    let btnEl = React.findDOMNode(btn);

    expect(btnEl).toBeDefined();
    expect(btnEl.innerHTML).toBe('barfoo');
  });
});
