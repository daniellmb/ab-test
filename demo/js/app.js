'use strict';
var myapp = angular.module('myApp', [
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ab.test' //<= awesomesauce
]);

// service to $broadcast 'run new a/b test' every 20 seconds.
myapp.service('tictoc', function ($interval, $rootScope) {
  var count = 0, max = 20, title;
  $interval(function () {
    // old-school update the page title to avoid broadcasting on the rootScope every second
    if (!title) {
      title = document.getElementsByTagName('title')[0];
    }
    title.innerHTML = (max - count) + ' seconds to next a/b test';
    count += 1;

    // trigger a new a/b test
    if (count === max + 1) {
      $rootScope.$broadcast('toc');
      count = 0;
    }
  }, 1000);
});

// imperative A/B/n test that updates an element using ng-bind
function HeadlinesCtrl($scope, ab, tictoc) {
  // setting the default value is need because it's bound one way with ng-bind
  $scope.headline = 'Include Your Children When Baking Cookies';

  // define variants
  var list = [
    'Something Went Wrong in Jet Crash, Experts Say',
    'Police Begin Campaign to Run Down Jaywalkers',
    'Drunks Get Nine Months in Violin Case',
    'Panda Mating Fails; Veterinarian Takes Over',
    'Plane Too Close to Ground, Crash Probe Told',
    'Miners Refuse to Work After Death',
    'Juvenile Court to Try Shooting Defendant',
    'Stolen Painting Found by Tree',
    'Two Sisters Reunited after 18 Years in Checkout Counter',
    'War Dims Hope for Peace',
    'If Strike Isn\'t Settled Quickly, It May Last a While',
    'New Study of Obesity Looks for Larger Test Group',
    'Astronaut Takes Blame for Gas in Space',
    'Kids Make Nutritious Snacks',
    'Local High School Dropouts Cut in Half'
  ];

  // listen for 'toc' event
  $scope.$on('toc', function () {
    // run new A/B/n test
    $scope.headline = ab.test(list, 1);
  });
}

// declarative A/B/n test using the ab-test directive
function ParagraphCtrl($scope) {

  $scope.onShow = function (variant) {
    // variant parameter === ab-variant scope
    //here you can call ab.log() to record a/b variant shown
    if (window.console && console.log) {
      console.log('variant ' + variant.index +
          '; is control ' + variant.control +
          '; data', variant.data);
    }
  };
  // listen for 'toc' event
  $scope.$on('toc', function () {
    // run new A/B/n test
    $scope.runAgain();
  });
}

function TestimonialsCtrl($scope, $http, ab) {
  // set default values
  $scope.testimonial = 'It really saves me time and effort, ab-test is exactly what I have been looking for!';
  $scope.name = 'Patrick U.';

  // load vatiants using JSON
  $http.get('data/testimonials.json')
  .then(function (res) {
    // listen for toc event
    $scope.$on('toc', function () {
      // A/B/n test it!
      var result = ab.test(res.data, 1);
      $scope.testimonial = result.text;
      $scope.name = result.by;
    });
  });
}

function SocialCtrl($scope, ab) {
  // setting the default value need because it's bound one way with ng-bind
  $scope.likes = '2.1M';
  // listen for toc event
  $scope.$on('toc', function () {
    // A/B/n test it!
    $scope.likes = ab.test(['2', '99', '283', '5.7K', '3.6M', '9.1M'], 1);
  });
}

function MediaCtrl($scope, ab) {
  // set the default value
  $scope.asSeenOn = 'http://i.imgur.com/VxsxKNe.jpg';
  // listen for toc event
  $scope.$on('toc', function () {
    // A/B/n test it!
    $scope.asSeenOn = ab.test([
      'http://i.imgur.com/e9QC6wF.jpg',
      'http://i.imgur.com/OBm9nh9.jpg',
      'http://i.imgur.com/VxsxKNe.jpg'
    ], 1);
  });
}

function ButtonsCtrl($scope, ab) {
  // set the default value
  $scope.style = 'btn-success';
  // listen for toc event
  $scope.$on('toc', function () {
    // A/B/n test it!
    var cssClass = ab.test(['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'], 1);

    // update ui
    $scope.style = 'btn-' + cssClass;
  });
}

function ImagesCtrl($scope) {
  // coming soon, pull requests welcome :)
}


function AwardsCtrl($scope) {
  // coming soon, pull requests welcome :)
}

function PricingCtrl($scope) {
  // coming soon, pull requests welcome :)
}

function PromotionalCtrl($scope) {
  // coming soon, pull requests welcome :)
}