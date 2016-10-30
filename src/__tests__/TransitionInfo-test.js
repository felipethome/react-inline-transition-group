/* eslint-disable max-len */

var TransitionInfo = require('../TransitionInfo');

describe('TransitionInfo', function () {

  it('should return the property with the longest time', function () {
    var transitionValues = {
      transitionProperty: ['background', 'height', 'width'],
      transitionDuration: [1000, 2000, 1000],
      transitionDelay: [0, 0, 2000],
    };

    var property = TransitionInfo.getMaximumTimeProperty(transitionValues);

    expect(property).toEqual('width');
  });

  it('should return the longest time property with lists of different size', function () {
    var transitionValues = {
      transitionProperty: ['background', 'height', 'width'],
      transitionDuration: [1000],
      transitionDelay: [1000, 2000],
    };

    var property = TransitionInfo.getMaximumTimeProperty(transitionValues);

    expect(property).toEqual('height');
  });

  it('should return an empty string when there is no valid transition', function () {
    var transitionValues = {
      transitionProperty: ['background', 'height', 'width'],
    };

    var property = TransitionInfo.getMaximumTimeProperty(transitionValues);

    expect(property).toEqual('');
  });

  it('should return an empty when duration is zero', function () {
    var transitionValues = {
      transitionProperty: ['background', 'height', 'width'],
      transitionDuration: [0],
    };

    var property = TransitionInfo.getMaximumTimeProperty(transitionValues);

    expect(property).toEqual('');
  });

  it('should return the right property when "all" is present', function () {
    var transitionValues = {
      transitionProperty: ['all', 'height', 'width'],
      transitionDuration: [1000, 2000, 1000],
    };

    var property = TransitionInfo.getMaximumTimeProperty(transitionValues);

    expect(property).toEqual('height');
  });

  it('should check if a property is in the property list', function () {
    var propertyArray = ['height', 'width'];

    var isPresent = TransitionInfo.isInPropertyList('height', propertyArray);

    expect(isPresent).toEqual(true);
  });

  it('should check if a property is in the property list as a shorthand', function () {
    var propertyArray = ['border', 'height', 'width'];

    var isPresent = TransitionInfo.isInPropertyList(
      'border-bottom-width', propertyArray
    );

    expect(isPresent).toEqual(true);
  });

  it('should return false if a property is not in the property list', function () {
    var propertyArray = ['border', 'height', 'width'];

    var isPresent = TransitionInfo.isInPropertyList('opacity', propertyArray);

    expect(isPresent).toEqual(false);
  });

  it('should return false if a property is not in the property list not even as shorthand', function () {
    var propertyArray = ['border', 'height', 'width'];

    var isPresent = TransitionInfo.isInPropertyList('border-bottom', propertyArray);

    expect(isPresent).toEqual(false);
  });

  it('should check if a property is equal a shorthand based on the property list', function () {
    var propertyArray = ['border', 'height', 'width'];

    var isPresent = TransitionInfo.isShorthandEqualProperty(
      'border', 'border-bottom-width', propertyArray
    );

    expect(isPresent).toEqual(true);
  });

  it('should handle correctly shorthands with higher specificity', function () {
    var propertyArray = ['border', 'border-bottom', 'width'];

    var isPresent = TransitionInfo.isShorthandEqualProperty(
      'border', 'border-bottom-width', propertyArray
    );

    expect(isPresent).toEqual(false);

    isPresent = TransitionInfo.isShorthandEqualProperty(
      'border-bottom', 'border-bottom-width', propertyArray
    );

    expect(isPresent).toEqual(true);
  });

});