'use strict';

describe('Directive: chat', function () {

  // load the directive's module and view
  beforeEach(module('cornerfindApp'));
  beforeEach(module('app/chat/chat.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chat></chat>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the chat directive');
  }));
});