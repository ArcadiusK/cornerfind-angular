'use strict';

describe('Service: condition', function () {

  // load the service's module
  beforeEach(module('cornerfindApp'));

  // instantiate service
  var condition;
  beforeEach(inject(function (_condition_) {
    condition = _condition_;
  }));

  it('should do something', function () {
    expect(!!condition).toBe(true);
  });

});
