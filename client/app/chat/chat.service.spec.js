'use strict';

describe('Service: chat', function () {

  // load the service's module
  beforeEach(module('cornerfindApp'));

  // instantiate service
  var chat;
  beforeEach(inject(function (_chat_) {
    chat = _chat_;
  }));

  it('should do something', function () {
    expect(!!chat).toBe(true);
  });

});
