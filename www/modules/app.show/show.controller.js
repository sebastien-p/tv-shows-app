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
   */
  function ShowController($scope, show) {
    var controller = this;

    /**
     * The resolved show JSON object.
     * @property {Object} show
     */
    $scope.show = show;
  }

  module.controller('showController', [
    '$scope',
    'show',
    ShowController
  ]);

}(angular.module('app.show')));
