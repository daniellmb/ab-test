'use strict';

describe('ab-service', function () {
  var ab, mock = function () {
    return jasmine.createSpy('ab');
  };

  // Use to provide any mocks needed
  function _provide(callback) {
    // Execute callback with $provide
    module(function ($provide) {
      callback($provide);
    });
  }

  // Use to inject the code under test
  function _inject() {
    inject(function (_ab_) {
      ab = _ab_;
    });
  }

  // Call this before each test, except where you are testing for errors
  function _setup() {
    // Mock any expected data
    _provide(function (provide) {
      provide.value('abMfg', mock);
    });

    // Inject the code under test
    _inject();
  }

  beforeEach(function () {
    // Load the service's module
    module('ab.test.directive');
  });

  describe('the service', function () {
    beforeEach(function () {
      // Inject with expected values
      _setup();
    });

    it('should exist', function () {
      expect(!!ab).toBe(true);
    });
  });

  describe('when created', function () {

    it('should return an abMfg instance', function () {
      expect(ab.isSpy).toBe(true);
    });

  });

  describe('when destroyed', function () {
    // Add specs
  });
});