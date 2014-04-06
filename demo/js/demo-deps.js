// Bower is a much better way to manage these! Including dependencies here just for demo use on GitHub.io

/*
 * @license
 * ab.js https://github.com/daniellmb/ab.js
 * (c) 2014 Daniel Lamb http://daniellmb.com
 * License: MIT
 */
(function(c,a){c[a]=c[a]||{};c[a].test=function(a,e){var b=Math.random();if(1E-4<b&&(b=Math.random(),b<e)){try{var d=new Uint16Array(1);c.crypto.getRandomValues(d);b=d[0]/65536}catch(f){b=Math.random()}return a[Math.floor(b*a.length)]}return null}})(window,'AB');
/*
 * @license
 * ab-test-service https://github.com/daniellmb/ab-test-service
 * (c) 2014 Daniel Lamb http://daniellmb.com
 * License: MIT
 */
angular.module("ab.test.service",[]).provider("abMfg",function(){this.$get=["AB",function(r){return function(t){t=t||{};var n=t.ab||r;if(!n)throw new Error("ab.js JavaScript library not provided");return{test:function(r,t){return n.test(r,t)},log:function(r,t,e){return n.log(r,t,e)}}}}]}).value("AB",window.AB);