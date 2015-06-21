'use strict';

describe('Directive: easypost', function () {

  // load the directive's module and view
  beforeEach(module('cornerfindApp'));
  beforeEach(module('app/easypost/easypost.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<easypost></easypost>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the easypost directive');
  }));
});