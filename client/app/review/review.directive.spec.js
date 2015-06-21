'use strict';

describe('Directive: review', function () {

  // load the directive's module and view
  beforeEach(module('cornerfindApp'));
  beforeEach(module('app/review/review.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<review></review>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the review directive');
  }));
});