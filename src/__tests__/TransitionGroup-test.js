var React = require('react');
var Enzyme = require('enzyme');

var shallow = Enzyme.shallow;
var render = Enzyme.render;

jest.unmock('../TransitionGroup');

var TransitionGroup = require('../TransitionGroup');

describe('TransitionGroup', function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});