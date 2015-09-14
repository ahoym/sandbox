jest.dontMock('../src/js/components/hero.js');


describe('Hero view', function () {
  let Hero = require('../src/js/components/hero.js');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let heroView, clickMock;

  beforeEach(function () {
    clickMock = jest.genMockFunction();
    Hero.prototype.handleClick = clickMock;
    heroView = TestUtils.renderIntoDocument(<Hero />);
  });

  it('renders my name', function () {
    let h1 = TestUtils.findRenderedDOMComponentWithTag(heroView, 'h1');
    let h1El = React.findDOMNode(h1);

    expect(h1El.className).toBe('hero__name');
    expect(h1El.innerHTML).toBe('Malcolm Ahoy');
  });

  it('renders my title', function () {
    let h2 = TestUtils.findRenderedDOMComponentWithTag(heroView, 'h2');
    let h2El = React.findDOMNode(h2);

    expect(h2El.className).toBe('hero__title');
    expect(h2El.innerHTML).toBe('Web Application Developer.');
  });

  it('renders a button', function () {
    let btn = TestUtils.findRenderedDOMComponentWithTag(heroView, 'button');
    let btnEl = React.findDOMNode(btn);

    expect(btnEl.className).toBe('hero__btn');
    expect(btnEl.innerHTML).toBe('Get to know me');
  });

  it('calls handleClick() when the button is clicked', function () {
    let btn = TestUtils.findRenderedDOMComponentWithTag(heroView, 'button');
    TestUtils.Simulate.click(btn);

    expect(clickMock).toBeCalled();
  })
});
