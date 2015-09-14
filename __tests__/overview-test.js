jest.autoMockOff();


describe('Overview', function () {
  let Overview = require('../src/js/components/content/overview');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let overviewView;

  beforeEach(function () {
    overviewView = TestUtils.renderIntoDocument(<Overview />);
  });

  it('renders content into the middle unit section', function () {
    let section = TestUtils.findRenderedDOMComponentWithClass(
                    overviewView, 'grid-unit__mid');
    let sectionEl = React.findDOMNode(section);

    expect(sectionEl).toBeDefined();
  });

  it('renders a grid unit Title', function () {
    let h1 = TestUtils.findRenderedDOMComponentWithTag(overviewView, 'h1');
    let h1El = React.findDOMNode(h1);

    expect(h1El.innerHTML).toBe('A Simple Overview');
  });

  it('renders a quote of emphasis', function () {
    let i = TestUtils.findRenderedDOMComponentWithTag(overviewView, 'i');
    let iEl = React.findDOMNode(i);
    let expectedQuote = '"It\'s harder to read code than to write it."';

    expect(iEl.innerHTML).toBe(expectedQuote);
  });

  it('renders four points total (title included)', function () {
    let lis = TestUtils.scryRenderedDOMComponentsWithTag(overviewView, 'li');
    // Convert list of components into array
    let lisArray = Array.prototype.slice.call(lis, 0);

    expect(lisArray.length).toBe(4);
  });
});
