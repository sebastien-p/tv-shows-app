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
     * Get only the data from a given $http response object.
     * @private
     * @function toData
     * @param {Object} response - A $http reponse object.
     * @return {*} The value of the data property.
     */
    function toData(response) { return response.data; }

    /**
     * Search TV shows matching the given query.
     * @method search
     * @param {String} query
     * @return {Promise}
     */
    service.search = function (query) {
      var params = { name: query, callback: 'JSON_CALLBACK' };
      return $http.jsonp(SHOWS_API_URL, { params: params }).then(toData);
    };
  }

  module.service('showsService', ['$http', 'SHOWS_API_URL', ShowsService]);

}(angular.module('app.home')));
