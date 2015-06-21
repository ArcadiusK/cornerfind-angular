'use strict';

describe('Service: eventEmitter', function () {

  // load the service's module
  beforeEach(module('cornerfindApp'));

  // instantiate service
  var eventEmitter;
  beforeEach(inject(function (_eventEmitter_) {
    eventEmitter = _eventEmitter_;
  }));

  it('should do something', function () {
    expect(!!eventEmitter).toBe(true);
  });

});
