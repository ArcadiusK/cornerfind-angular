'use strict';

describe('Controller: OneProductViewCtrl', function () {

  // load the controller's module
  beforeEach(module('cornerfindApp'));

  var OneProductViewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OneProductViewCtrl = $controller('OneProductViewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
