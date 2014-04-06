// Karma configuration
module.exports = function (config) {
  config.set({
    basePath : '../',

    files : [
      // deps
      'test/lib/angular/angular.js',
      'test/lib/angular/angular-*.js',
      'test/lib/mock/*.js',
      // ab-test
      'ab-test.js',
      // demo source
      'demo/js/**/*.js',
      // specs
      'test/unit/**/*.js'
    ],

    exclude : [
      'test/lib/angular/angular-loader.js',
      'test/lib/angular/*.min.js',
      'test/lib/angular/angular-scenario.js'
    ],

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      reporters: [{
        type: 'text'
      }, {
        type: 'lcov',
        dir: 'coverage/'
      }]
    },
    port: 9876,
    colors: true,

    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_INFO,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    captureTimeout: 60000,

    plugins : [
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-coverage'
    ]
  });

  // have travis publish to coveralls
  if (process.env.TRAVIS) {
    config.reporters.push('coveralls');
  }
};