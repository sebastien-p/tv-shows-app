/**
 * @memberOf app.show
 */
(function (module) {
  'use strict';

  /**
   * The show screen controller.
   * @constructor ShowController
   * @param {Object} $scope - The associated Angular $scope object.
   * @param {Object} show - The resolved show JSON object.
   * @param {Object} showsService - The shows service.
   */
  function ShowController($scope, show, showsService) {
    var controller = this;

    /**
     * The resolved show JSON object.
     * @property {Object} show
     */
    $scope.show = show;

    /**
     * Add or remove the show to/from the favorite list.
     * @method setFavoriteStatus
     * @param {Boolean} status - Add if `true`, remove if `false`.
     */
    controller.setFavoriteStatus = function (status) {
      if ($scope.show.favorite !== status) { $scope.show.favorite = status; }
      showsService.setShowFavoriteStatus($scope.show, status);
    };
  }

  module.controller('showController', [
    '$scope',
    'show',
    'showsService',
    ShowController
  ]);

}(angular.module('app.show')));
