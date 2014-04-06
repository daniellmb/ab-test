'use strict';

describe('ab-test directive', function () {
  var scope, compile, abSvc, MockABSvc = function () {
        this.test = jasmine.createSpy('test');
        this.log = jasmine.createSpy('log');
        return this;
      };

  // Use to provide any mocks needed
  function _provide(callback) {
    // Execute callback with $provide
    module(function ($provide) {
      callback($provide);
    });
  }

  // Use to create the directive under test
  function _create(template) {
    var elm;

    // Create directive
    elm = compile(template)(scope);

    // Return
    return elm;
  }

  // Inject dependencies
  function _inject() {
    inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      compile = $compile;
    });
  }

  // Call this before each test, except where you are testing for edge-cases
  function _setup() {
    // Mock the expected values
    _provide(function (provide) {
      abSvc = new MockABSvc();
      provide.value('ab', abSvc);
    });
    // Inject the code under test
    _inject();
  }

  beforeEach(function () {
    // Load the directive's module
    module('ab.test.directive');
  });

  describe('when created', function () {

    beforeEach(function () {
      // Inject with 'normal' setup
      _setup();
    });

    it('should throw error when ab-frequency attribute not defined', function () {
      // arrange
      function invalidTemplate() {
        // act
        _create('<ab-test></ab-test>');
      }
      // assert
      expect(invalidTemplate).toThrow(new Error('ab-test: ab-frequency attribute required'));
    });

    it('should throw error when ab-frequency attribute value is not a number', function () {
      // arrange
      function invalidTemplate() {
        // act
        _create('<ab-test ab-frequency="foo"></ab-test>');
      }
      // assert
      expect(invalidTemplate).toThrow(new Error('ab-test: test frequency must be a float between 0.0001 and 1'));
    });

    it('should throw error when ab-frequency attribute value is less than 0.001', function () {
      // arrange
      function invalidTemplate() {
        // act
        _create('<ab-test ab-frequency="0.00009"></ab-test>');
      }
      // assert
      expect(invalidTemplate).toThrow(new Error('ab-test: test frequency must be a float between 0.0001 and 1'));
    });

    it('should not throw error when ab-frequency attribute value is 1', function () {
      // arrange
      function invalidTemplate() {
        // act
        _create('<ab-test ab-frequency="1"></ab-test>');
      }
      // assert
      expect(invalidTemplate).not.toThrow(new Error('ab-test: test frequency must be a float between 0.0001 and 1'));
    });

    it('should throw error when ab-frequency attribute value is more than 1', function () {
      // arrange
      function invalidTemplate() {
        // act
        _create('<ab-test ab-frequency="10"></ab-test>');
      }
      // assert
      expect(invalidTemplate).toThrow(new Error('ab-test: test frequency must be a float between 0.0001 and 1'));
    });

    it('should throw error when child variants are not found', function () {
      // arrange
      function invalidTemplate() {
        // act
        _create('<ab-test ab-frequency="0.1"></ab-test>');
      }
      // assert
      expect(invalidTemplate).toThrow(new Error('ab-test: no variants found for the a/b test'));
    });

    it('should not throw error with valid template', function () {
      // arrange
      function validTemplate() {
        // act
        _create('<ab-test ab-frequency="0.1"><ab-variant/></ab-test>');
      }
      // assert
      expect(validTemplate).not.toThrow();
    });

    it('should accept optional ab-shown attribute', function () {
      // arrange
      scope.foo = jasmine.createSpy('foo');
      // act
      var elm = angular.element(_create('<ab-test ab-frequency="0.1" ab-shown="foo"><ab-variant/></ab-test>'));
      // assert
      expect(elm.isolateScope().shown).toBe(scope.foo);
    });

    it('should accept optional ab-run attribute', function () {
      // arrange
      // act
      // assert
    });

  });

  // inject the directive link service to test hard-to-reach corners :)
  describe('when created', function () {
    var abTestLink;
    // custom inject to control what gets passed to the directive link service
    beforeEach(function () {
      inject(function ($rootScope, $compile, _abTestLink_) {
        scope = $rootScope.$new();
        compile = $compile;
        abTestLink = _abTestLink_;
      });
    });

    it('should call run on the scope', function () {
      // arrange
      scope.run = jasmine.createSpy('run');
      scope.frequency = 1;
      var ctrl = {variants: [null]};
      // act
      abTestLink(scope, null, null, ctrl);
      // assert
      expect(scope.run).toHaveBeenCalled();
    });
  });

  describe('when the model changes', function () {
    // Add specs
  });

  return describe('when destroyed', function () {
    // Add specs
  });

});