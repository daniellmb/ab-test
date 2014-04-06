'use strict';

/*
See: https://github.com/angular/protractor/blob/master/docs/getting-started.md
*/

describe('my app', function () {

  describe('Headlines', function () {

    beforeEach(function () {
      browser.get('index.html');
    });

    it('should show the default value', function () {
      expect(element(by.binding('headline')).getText()).toEqual('Include Your Children When Baking Cookies');
    });

  });

  describe('Paragraphs', function () {

    beforeEach(function () {
      browser.get('index.html');
    });

    it('should show only one of the test variants at a time', function () {
      var selector = '.paragraphs .ab-active',
        activeVariant = element.all(by.css(selector));
      expect(activeVariant.count()).toEqual(1);
    });

    // to do click "run again" and expect value to change

  });

  describe('Testimonials', function () {

    beforeEach(function () {
      browser.get('index.html');
    });

    it('should show a testimonial', function () {
      var testimonial = element(by.binding('testimonial'));
      expect(testimonial.getText()).toBe('It really saves me time and effort, ab-test is exactly what I have been looking for!');
    });

  });

  describe('Social', function () {

    beforeEach(function () {
      browser.get('index.html');
    });

    it('should show the number of likes', function () {
      var likes = element(by.binding('likes'));
      expect(likes.getText()).toBe('2.1M');
    });

  });

  describe('Media', function () {

    beforeEach(function () {
      browser.get('index.html');
    });

    it('should show an as-seen-on media image', function () {
      var asSeenOn = element(by.css('.as-seen-on-media'));
      asSeenOn.getAttribute('src').then(function (attr) {
        expect(attr).toBe('http://i.imgur.com/VxsxKNe.jpg');
      });
    });

  });

  describe('Buttons', function () {

    beforeEach(function () {
      browser.get('index.html');
    });

    it('should a/b test the star this repo button', function () {
      var asSeenOn = element(by.css('#star-repo-btn'));
      asSeenOn.getAttribute('class').then(function (attr) {
        expect(attr).toMatch('btn-success');
      });
    });

  });

});
