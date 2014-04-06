MockABJS = function () {
  'use strict';

  // Methods
  this.test = jasmine.createSpy('test');
  this.log = jasmine.createSpy('log');

  return this;
};