'use strict';

describe('ab-test controller', function () {
  var abTestCtrl, scope, abSvc, abSvcTestResult,
      MockABSvc = function () {
        this.test = function () {
          return abSvcTestResult;
        };
        spyOn(this, 'test').andCallThrough();
        return this;
      };

  // Initialize the controller and scope
  beforeEach(function () {
    // Load the controller's module
    module('ab.test.directive');

    // Provide any mocks needed
    module(function ($provide) {
      abSvc = new MockABSvc();
      $provide.value('ab', abSvc);
    });

    // Inject code under test
    inject(function ($controller) {
      scope = {};
      abTestCtrl = $controller('abTestCtrl', {
        $scope: scope
      });
    });

  });

  it('should exist', function () {
    expect(!!abTestCtrl).toBe(true);
  });

  describe('when created', function () {

    it('should provide a variants array to the scope', function () {
      expect(abTestCtrl.variants instanceof Array).toBe(true);
    });

    it('should provide an add method on the controller', function () {
      expect(typeof abTestCtrl.add).toBe('function');
    });

    it('should provide a run method on the scope', function () {
      expect(typeof scope.run).toBe('function');
    });

  });

  describe('add method', function () {

    it('should add to the variants array', function () {
      // arrange
      expect(abTestCtrl.variants.length).toBe(0);
      // act
      abTestCtrl.add({});
      // assert
      expect(abTestCtrl.variants.length).toBe(1);
    });

    it('should set an index number on the variant', function () {
      // arrange
      var variant = {};
      // act
      abTestCtrl.add(variant);
      // assert
      expect(abTestCtrl.variants[0].index).toBeDefined();
    });

    it('should set control on the scope if variant is the control', function () {
      // arrange
      expect(abTestCtrl.control).not.toBeDefined();
      var variant = {control: true};
      // act
      abTestCtrl.add(variant);
      // assert
      expect(abTestCtrl.control).toBe(variant);
    });

    it('should not set control on the scope if variant isn\'t the control', function () {
      // arrange
      expect(abTestCtrl.control).not.toBeDefined();
      // act
      abTestCtrl.add({});
      // assert
      expect(abTestCtrl.control).not.toBeDefined();
    });

  });

  describe('run method', function () {

    it('should reset the active variant', function () {
      // arrange
      abTestCtrl.variant = {active: true};
      // act
      scope.run();
      // assert
      expect(abTestCtrl.variant.active).toBe(false);
    });

    it('should run an a/b test', function () {
      // arrange
      expect(abSvc.test.callCount).toBe(0);
      scope.frequency = -1;
      // act
      scope.run();
      // assert
      expect(abSvc.test.callCount).toBe(1);
      expect(abSvc.test).toHaveBeenCalledWith(abTestCtrl.variants, scope.frequency);
    });

    describe('when variant is returned', function () {
      it('should show the variant', function () {
        // arrange
        abSvcTestResult = {};
        var control = {control: true, uid: 'control'};
        abTestCtrl.add(control);
        // act
        scope.run();
        // assert
        expect(abTestCtrl.variant).not.toBe(control);
        expect(abTestCtrl.variant).toBe(abSvcTestResult);
      });
      it('should call abShown with the variant', function () {
        // arrange
        abSvcTestResult = {};
        var control = {control: true, uid: 'control'};
        abTestCtrl.add(control);
        // act
        scope.run();
        // assert
        expect(abTestCtrl.variant).not.toBe(control);
        expect(abTestCtrl.variant).toBe(abSvcTestResult);
      });
      it('should select a variant based on ab-select', function () {
        // arrange
        var variant1 = {uid: 'variant1'};
        var variant2 = {uid: 'variant2'};
        scope.select = function() {return 'variant2'};
        abTestCtrl.add(variant1);
        abTestCtrl.add(variant2);
        // act
        scope.run();
        // assert
        expect(abTestCtrl.variant).toBe(variant2);
      });
    });

    describe('when variant is not returned', function () {
      it('should show the control', function () {
        // arrange
        abSvcTestResult = null;
        var control = {control: true};
        abTestCtrl.add(control);
        // act
        scope.run();
        // assert
        expect(abTestCtrl.variant).toBe(control);
      });
      it('should not show anything when no control', function () {
        // arrange
        abSvcTestResult = null;
        // act
        scope.run();
        // assert
        expect(abTestCtrl.variant).not.toBeDefined();
        expect(abTestCtrl.control).not.toBeDefined();
      });
    });

  });

  describe('when the model changes', function () {
    // Add specs
  });

  describe('when destroyed', function () {
    // Add specs
  });
});