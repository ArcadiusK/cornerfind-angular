'use strict';

describe('Directive: productCardView', function () {

  // load the directive's module and view
  beforeEach(module('cornerfindApp'));
  beforeEach(module('app/products/productCardView/productCardView.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<product-card-view></product-card-view>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the productCardView directive');
  }));
});