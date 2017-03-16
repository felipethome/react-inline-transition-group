var TransitionParser;

describe('TransitionParser', function () {

  beforeEach(function () {
    jest.resetModuleRegistry();
    TransitionParser = require('../TransitionParser');
  });

  it('should return an empty object when there is no transition', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({});
  });

  it('should parse transition shorthand correctly', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transition: 'background 1s 1s, height 2s ' +
        'color 2s cubic-bezier(0.25, 0, .45, 2), ' +
        'width 3s cubic-bezier(0.15, 1, 0.75, 4)',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['background', 'height', 'width'],
      transitionDuration: [1000, 2000, 3000],
      transitionDelay: [1000, 2000, 0],
    });
  });

  it('should parse transitions with different lengths correctly', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transitionProperty: 'background, height, width',
      transitionDuration: '1s, 2s',
      transitionDelay: '3s',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['background', 'height', 'width'],
      transitionDuration: [1000, 2000],
      transitionDelay: [3000],
    });
  });

  it('should parse respecting the order of appearance', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      transition: 'background 1s 3s, height 2s 3s',
      transitionDelay: '4s',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['background', 'height'],
      transitionDuration: [1000, 2000],
      transitionDelay: [4000],
    });

    style = {
      background: '#FFF',
      height: '50px',
      transitionDelay: '4s',
      transition: 'background 1s 3s, height 2s 3s',
    };

    transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['background', 'height'],
      transitionDuration: [1000, 2000],
      transitionDelay: [3000, 3000],
    });

    style = {
      background: '#FFF',
      height: '50px',
      transitionDelay: '4s',
      transition: 'background 1s 3s, height 2s 3s',
      transitionDuration: '5s, 6s',
    };

    transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['background', 'height'],
      transitionDuration: [5000, 6000],
      transitionDelay: [3000, 3000],
    });
  });

  it('should parse the "all" property correctly', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transitionProperty: 'all, background',
      transitionDuration: '1s, 2s',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 2000],
    });
  });

  it('should parse the "all" property in shorthands correctly', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transition: 'all 1s ease-out 1s, background 2s',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 2000],
      transitionDelay: [1000, 0],
    });
  });

  it('should not differentiate uppercase and lowercase letters', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transition: 'AlL 1S, backgroUnD 2s',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 2000],
      transitionDelay: [0, 0],
    });

    style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transitionProperty: 'AlL, backgroUnD',
      transitionDuration: '1S, 2s',
    };

    transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 2000],
    });
  });

  it('should handle "s" and "ms" units', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transition: 'all 1s, background 20ms',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 20],
      transitionDelay: [0, 0],
    });

    style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transitionProperty: 'all, background',
      transitionDuration: '1s, 20ms',
    };

    transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 20],
    });
  });

  it('should handle extra spaces correctly', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transition: '    all     1s   ,background   20ms    ',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 20],
      transitionDelay: [0, 0],
    });

    style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transitionProperty: '    all   ,    background',
      transitionDuration: '1s,20ms',
    };

    transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 20],
    });
  });

  it('should handle browser prefixes correctly', function () {
    var style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transition: 'all 1s ,background 20ms',
      WebkitTransition: 'all 1s ,background 2s',
    };

    var transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 2000],
      transitionDelay: [0, 0],
    });

    style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transition: 'all 1s ,background 20ms',
      MozTransition: 'all 1s ,background 2s',
    };

    transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 2000],
      transitionDelay: [0, 0],
    });

    style = {
      background: '#FFF',
      height: '50px',
      width: '50px',
      transition: 'all 1s ,background 20ms',
      msTransition: 'all 1s ,background 2s',
    };

    transitions = TransitionParser.getTransitionValues(style);

    expect(transitions).toEqual({
      transitionProperty: ['all', 'background'],
      transitionDuration: [1000, 2000],
      transitionDelay: [0, 0],
    });
  });

  it('should throw an error when was expected a numeric value', function () {
    var style = {
      background: '#FFF',
      transition: 'background ease-out 1s',
    };

    expect(function () {
      TransitionParser.getTransitionValues(style);
    }).toThrow();
  });

});