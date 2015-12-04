/*
 * @license
 * ab-test v0.0.1
 * (c) 2014 Daniel Lamb http://daniellmb.com
 * License: MIT
 */

// shortcut to include both the a/b test service and directive modules
angular.module('ab.test', ['ab.test.directive']);

angular.module('ab.test.directive', ['ab.test.service', 'ngAnimate'])

// create ab test service
.factory('ab', function (abMfg) {
  return abMfg();
})

// ab-test directive controller
.controller('abTestCtrl', ['$scope', 'ab', function abTestCtrl($scope, ab) {
  var ctrl = this,
      control = ctrl.control,
      variants = ctrl.variants = [],
      shown = $scope.shown || angular.noop,
      select = $scope.select || angular.noop;

  // register an a/b test variant
  ctrl.add = function add(variant) {
    // set in index on the variant
    variant.index = variants.length;

    variants.push(variant);

    // check if variant is the a/b test "control"
    if (variant.control) {
      ctrl.control = control = variant;
    }
  };

  function getResultFromSelect() {
    var result = null;
    var toSelect = $scope.select();
    variants.forEach(function(elem) {
      if(elem.uid === toSelect || elem.uid === parseInt(toSelect)) {
        result = elem;
      }
    });
    return result;
  }

  // run the ab test
  $scope.run = function run() {
    // hide active variant
    if (ctrl.variant) {
      ctrl.variant.active = false;
    }

    var result= null;

    // If user provides their own selection function, use that
    if($scope.select) {
      result = getResultFromSelect();
    }

    if(!result) {
      result = ab.test(variants, $scope.frequency);
    }

    // check if there is a variant to show
    if (result) {

      // show variant returned
      result.active = true;
      ctrl.variant = result;

      // notify optional callback what was shown
      shown(result);
    } else if (control) {

      // no variant, show control instead
      control.active = true;
      ctrl.variant = control;

      // notify optional callback what was shown
      shown(control);
    }
  };
}])

// ab-test directive
.directive('abTest', ['abTestLink', function abTest(abTestLink) {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: '<div ng-transclude></div>',
    controller: 'abTestCtrl',
    scope: {
      // (optional) two way binding
      run: '=?abRun',
      shown: '=?abShown',
      // (required) two way binding
      frequency: '=abFrequency',
      select: '=?abSelect'
    },
    compile: function compile(elm, attrs) {

      // a/b test frequency required
      if (!angular.isDefined(attrs.abFrequency)) {
        throw new Error('ab-test: ab-frequency attribute required');
      }

      // return post link method (see factory below)
      return abTestLink;
    }
  };
}])

// ab-test directive link function (separate so it can be easily mocked)
.factory('abTestLink', function abTestLink() {
  return function link(scope, elm, attrs, ctrl) {
    var frequency = scope.frequency;

    // quick data sanity checks
    if (isNaN(frequency) || (frequency < 0.0001 || frequency > 1)) {
      throw new Error('ab-test: test frequency must be a float between 0.0001 and 1');
    }
    if (ctrl.variants.length === 0) {
      throw new Error('ab-test: no variants found for the a/b test');
    }

    // run the a/b test
    scope.run();
  };
})

// ab-test variant directive
.directive('abVariant', ['abVariantLink', function abVariant(abVariantLink) {
  return {
    require: '^abTest',
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: '<div ng-transclude ng-show="active" class="ng-class:{\'ab-active\':active}; ab-animate"></div>',
    scope: {
      uid: '=abUid',
      // (optional) two way binding
      active: '=?abActive',
      control: '=?abControl',
      data: '=?abData'
    },
    // empty controller so other directives can require being 'within' an ab-variant
    controller: angular.noop,
    link: abVariantLink // (see factory below)
  };
}])

// ab-variant directive link function (separate so it can be easily mocked)
.factory('abVariantLink', function abVariantLink() {
  return function link(scope, elm, attrs, ctrl) {
    // register variant with ab-test parent directive
    ctrl.add(scope);
  };
});