# ab-test
[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url] [![Bower version][bower-image]][bower-url] [![NPM version][npm-image]][npm-url]

AngularJS A/B Test Service and Directives for creating declarative and imperative A/B/n tests.

### Loads of Demos!
  - Headlines & Sub-Headlines
  - Paragraph Text
  - Testimonials (Sticky Test)
  - Links (wording, size, color)
  - Buttons (wording, size, color)
  - Images
  - Social Proof
  - Media Mentions
  - Awards and Badges
  - Product Pricing
  - Promotional Offers

## Install Choices
- `bower install ab-test`
- [download the zip](https://github.com/daniellmb/ab-test/archive/master.zip)


## Setup
1. Include the `ab-test.js` script provided by this component into your app.
2. Add `ab.test` or `ab.test.directive` as a module dependency to your app.


## Usage


## `<ab-test>` Directive

### Properties
 - frequency
 - ab-run
 - ab-select

## `<ab-variant>` Directive

## Sticky Tests

Running an A/B test is great but it's even better if you make the tests "sticky" to the user. Meaning if someone
at your site gets variant B the next time they load the page or come back they get variant B again and not A. You can
select a given variant by calling the `ab-select` method on the `<ab-test>` directive. How you track users is up to you,
but since A/B tests aren't permanent a simple solution will most likely do very well. One way would be to use a cookie with
[angular-uuid-service](https://github.com/daniellmb/angular-uuid-service) a light weight (214 byte) UUID generator service
for AngularJS that can be installed using `bower`. See the demo for an example implementation.

### Running the demo

You can pick one of these options:

- serve this repository with your webserver
- use node.js and run `node scripts/web-server.js`

Then navigate your browser to `http://localhost:<port>/demo/index.html` to see the app running in
your browser.

### Running unit tests
- Run `npm install` and `bower install` to make sure you have all the development dependencies.
- Run `bash scripts/test.sh`
- Re-run tests just change any of your source or test javascript files


### End to end testing
Requires a webserver;

- Run `npm install` and `bower install` to make sure you have all the development dependencies.
- Run `node ./scripts/web-server.js` or use your server that hosts the static files.
- Run the tests from console with [Protractor](https://github.com/angular/protractor) via
    `bash scripts/e2e-test.sh`

## Testing
- Run `npm install` and `bower install` to make sure you have all the development dependencies.
- Run `npm test` to run both unit tests and end-to-end tests.
- Run `npm run unit` to run all the unit tests.
- Run `npm run gulp` to update the .min.js and .map files.

## Contributing
Pull requests welcome :)
- Run `npm run gulp` to update the .min.js and .map files with any changes you have made to ab-test.js.


## License
(The MIT License)

Copyright (c) 2014 Daniel Lamb <daniellmb.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[bower-url]: http://bower.io/search/?q=ab-test
[bower-image]: https://badge.fury.io/bo/ab-test.png
[npm-url]: https://npmjs.org/package/ab-test
[npm-image]: https://badge.fury.io/js/ab-test.png
[travis-url]: https://travis-ci.org/daniellmb/ab-test
[travis-image]: https://travis-ci.org/daniellmb/ab-test.png?branch=master
[coveralls-url]: https://coveralls.io/r/daniellmb/ab-test
[coveralls-image]: https://coveralls.io/repos/daniellmb/ab-test/badge.png
[depstat-url]: https://david-dm.org/daniellmb/ab-test
[depstat-image]: https://david-dm.org/daniellmb/ab-test.png?theme=shields.io
