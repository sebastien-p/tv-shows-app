/**
 * @memberOf app.home
 */
(function (module) {
  'use strict';

  /**
   * The home screen controller.
   * @constructor HomeController
   * @param {Object} $scope - The associated Angular $scope object.
   * @param {Object} $state - The Angular UI Router $state service.
   * @param {Array} favorites - The resolved favorite shows.
   * @param {Object} showsService - The shows service.
   */
  function HomeController($scope, $state, favorites, showsService) {
    var controller = this;

    /**
     * To be called before the view is entered.
     * @private
     * @function onViewBeforeEnter
     */
    function onViewBeforeEnter() {
      var globals = $state.$current.locals.globals;
      // Reset resolved values so that they will be updated.
      $scope.favorites = globals.favorites;
    }

    /**
     * The search model object containing query and results.
     * @property {Object} search
     */
    $scope.search = { query: '', results: [] };

    /**
     * The favorite shows.
     * @property {Array} favorites
     */
    $scope.favorites = favorites;

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

    $scope.$on('$ionicView.beforeEnter', onViewBeforeEnter);
  }

  module.controller('homeController', [
    '$scope',
    '$state',
    'favorites',
    'showsService',
    HomeController
  ]);

}(angular.module('app.home')));
