/**
 * @memberOf app.home
 */
(function (module) {
  'use strict';

  /**
   * The shows service.
   * @constructor ShowsService
   * @param {Object} $http - The Angular $http service.
   * @param {String} SHOWS_API_URL - The shows API url.
   */
  function ShowsService($http, SHOWS_API_URL) {
    var service = this;

    /**
     * Get resources using JSONP.
     * @private
     * @function jsonp
     * @param {String} url - String to append to SHOWS_API_URL.
     * @param {Object} [params] - Params to pass in the query string.
     * @return {Promise}
     */
    function jsonp(url, params) {
      params = _.extend({ callback: 'JSON_CALLBACK', s: 'thetvdb' }, params);
      var promise = $http.jsonp(SHOWS_API_URL + url, { params: params });
      return promise.then(function (response) { return response.data; });
    }

    /**
     * Search for TV shows matching a given query.
     * @method search
     * @param {String} query
     * @return {Promise}
     */
    service.search = function (query) { return jsonp('', { name: query }); };

    /**
     * Get a TV show informations given its ID.
     * @method getShow
     * @param {String} showId
     * @return {Promise}
     */
    service.getShow = function (id) { return jsonp('/' + id + '/info'); };
  }

  module.service('showsService', ['$http', 'SHOWS_API_URL', ShowsService]);

}(angular.module('app.home')));
