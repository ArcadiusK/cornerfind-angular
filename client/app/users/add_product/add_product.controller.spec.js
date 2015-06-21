'use strict';

describe('Controller: AddProductCtrl', function () {

  // load the controller's module
  beforeEach(module('cornerfindApp'));

  var AddProductCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddProductCtrl = $controller('AddProductCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
