/**
 * @memberOf app.home
 */
(function (module) {
  'use strict';

  /**
   * The shows API url.
   * @constant SHOWS_API_URL
   * @type {String}
   */
  var SHOWS_API_URL = 'http://series-ortiz.rhcloud.com/series';

  module.constant('SHOWS_API_URL', SHOWS_API_URL);

}(angular.module('app.home')));
