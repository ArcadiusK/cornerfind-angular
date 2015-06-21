'use strict';

describe('Service: Like', function () {

  // load the service's module
  beforeEach(module('cornerfindApp'));

  // instantiate service
  var Like;
  beforeEach(inject(function (_Like_) {
    Like = _Like_;
  }));

  it('should do something', function () {
    expect(!!Like).toBe(true);
  });

});
