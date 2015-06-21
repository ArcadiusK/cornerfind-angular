'use strict';

describe('Directive: checkoutDirective', function () {

  // load the directive's module and view
  beforeEach(module('cornerfindApp'));
  beforeEach(module('app/checkout/checkoutDirective/checkoutDirective.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<checkout-directive></checkout-directive>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the checkoutDirective directive');
  }));
});