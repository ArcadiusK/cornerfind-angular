'use strict';

describe('Service: brand', function () {

  // load the service's module
  beforeEach(module('cornerfindApp'));

  // instantiate service
  var brand;
  beforeEach(inject(function (_brand_) {
    brand = _brand_;
  }));

  it('should do something', function () {
    expect(!!brand).toBe(true);
  });

});
