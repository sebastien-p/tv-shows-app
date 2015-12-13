/**
 * @memberOf app.home
 */
(function (module) {
  'use strict';

  /**
   * The home screen controller.
   * @constructor HomeController
   * @param {Object} $scope - The associated Angular $scope object.
   * @param {Object} showsService - The shows service.
   */
  function HomeController($scope, showsService) {
    var controller = this;

    /**
     * The search model object containing query and results.
     * @property {Object} search
     */
    $scope.search = { query: '', results: [] };

    /**
     * Search for TV shows matching the current search query value.
     * @method search
     */
    controller.search = function () {
      if (!$scope.search.query) { return; }
      var promise = showsService.searchWithArt($scope.search.query);
      promise.then(function (results) { $scope.search.results = results; });
    };

    /**
     * Clear search query and results.
     * @method clearSearch
     */
    controller.clearSearch = function () {
      $scope.search.query = '';
      $scope.search.results = [];
    };
  }

  module.controller('homeController', [
    '$scope',
    'showsService',
    HomeController
  ]);

}(angular.module('app.home')));
