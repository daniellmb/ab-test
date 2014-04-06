'use strict';

describe('ab-variant directive', function () {
  var scope, compile,
      abSvc, MockABSvc = function () {
        this.test = jasmine.createSpy('test');
        return this;
      },
      validTemplate = '<ab-test ab-frequency="freq">' +
                        '<ab-variant ab-data="data">A</ab-variant>' +
                        '<ab-variant ab-active="active">B</ab-variant>' +
                        '<ab-variant ab-control="true">C</ab-variant>' +
                      '</ab-test>';

  // Use to provide any mocks needed
  function _provide(callback) {
    // Execute callback with $provide
    module(function ($provide) {
      callback($provide);
    });
  }

  // Use to create the directive under test
  function _create(template, data, active) {
    var elm;

    // Setup scope state
    scope.data = data;
    scope.freq = 0.5;
    scope.active = active;

    // Create directive
    elm = compile(template || validTemplate)(scope);

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

    it('should throw error when not a child of an ab-test directive', function () {
      // arrange
      function invalidTemplate() {
        // act
        _create('<ab-variant></ab-variant>');
      }
      // assert
      expect(invalidTemplate).toThrow();
    });

    it('should not throw error with a valid template', function () {
      // arrange
      function validTemplate() {
        // act
        _create();
      }
      // assert
      expect(validTemplate).not.toThrow();
    });

    it('should accept optional ab-active attribute', function () {
      // arrange
      // act
      var elm = angular.element(_create(null, null, true).children()[1]);
      // assert
      expect(elm.isolateScope().active).toBe(true);
    });

    it('should accept optional ab-control attribute', function () {
      // arrange
      // act
      var elm = angular.element(_create().children()[2]);
      // assert
      expect(elm.isolateScope().control).toBe(true);
    });

    it('should accept optional ab-data attribute', function () {
      // arrange
      var data = 'foo';
      // act
      var elm = angular.element(_create(null, data).children()[0]);
      // assert
      expect(elm.isolateScope().data).toBe(data);
    });

    it('should show when active', function () {
      // arrange
      var elm = angular.element(_create().children()[0]);
      // act
      elm.isolateScope().active = true;
      scope.$apply();
      // assert
      expect(elm.hasClass('ng-hide')).toBe(false);
    });

    it('should hide when inactive', function () {
      // arrange
      var elm = angular.element(_create().children()[0]);
      // act
      elm.isolateScope().active = false;
      scope.$apply();
      // assert
      expect(elm.hasClass('ng-hide')).toBe(true);
    });

  });

  // inject the directive link service to test hard-to-reach corners :)
  describe('when created', function () {
    var abVariantLink;
    // custom inject to control what gets passed to the directive link service
    beforeEach(function () {
      inject(function ($rootScope, $compile, _abVariantLink_) {
        scope = $rootScope.$new();
        compile = $compile;
        abVariantLink = _abVariantLink_;
      });
    });

    it('should register the itself with ab-test', function () {
      // arrange
      scope.frequency = 1;
      var ctrl = {
        variants: [null],
        add: jasmine.createSpy('add')
      };
      // act
      abVariantLink(scope, null, null, ctrl);
      // assert
      expect(ctrl.add).toHaveBeenCalled();
    });

  });

  describe('when destroyed', function () {
    // Add specs
  });
});