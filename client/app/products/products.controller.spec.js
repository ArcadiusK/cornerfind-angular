'use strict';

describe('Controller: ProductsCtrl', function () {

  // load the controller's module
  beforeEach(module('cornerfindApp'));

  var ProductsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductsCtrl = $controller('ProductsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
