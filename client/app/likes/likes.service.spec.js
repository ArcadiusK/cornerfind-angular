'use strict';

describe('Service: likes', function () {

  // load the service's module
  beforeEach(module('cornerfindApp'));

  // instantiate service
  var likes;
  beforeEach(inject(function (_likes_) {
    likes = _likes_;
  }));

  it('should do something', function () {
    expect(!!likes).toBe(true);
  });

});
