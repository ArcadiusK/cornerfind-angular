'use strict';

describe('Controller: EasypostCtrl', function () {

  // load the controller's module
  beforeEach(module('cornerfindApp'));

  var EasypostCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EasypostCtrl = $controller('EasypostCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
