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

  /**
   * The shows art API url.
   * @constant SHOWS_ART_API_URL
   * @type {String}
   */
  var SHOWS_ART_API_URL = 'http://webservice.fanart.tv/v3/tv/';

  /**
   * The shows art API key.
   * @constant SHOWS_ART_API_KEY
   * @type {String}
   */
  var SHOWS_ART_API_KEY = '9521b1d5a250f7213dc38d9467853780';

  module.constant('SHOWS_API_URL', SHOWS_API_URL);
  module.constant('SHOWS_ART_API_URL', SHOWS_ART_API_URL);
  module.constant('SHOWS_ART_API_KEY', SHOWS_ART_API_KEY);

}(angular.module('app.home')));
