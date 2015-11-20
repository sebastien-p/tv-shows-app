/**
 * @memberOf app.show
 */
(function (module) {
  'use strict';

  /**
   * The season screen controller.
   * @constructor SeasonController
   * @param {Object} $scope - The associated Angular $scope object.
   * @param {Object} season - The resolved season JSON object.
   */
  function SeasonController($scope, season) {
    var controller = this;

    /**
     * The resolved season JSON object.
     * @property {Object} season
     */
    $scope.season = season;
  }

  module.controller('seasonController', [
    '$scope',
    'season',
    SeasonController
  ]);

}(angular.module('app.show.season')));
