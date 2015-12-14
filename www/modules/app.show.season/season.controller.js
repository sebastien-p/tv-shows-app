/**
 * @memberOf app.show.season
 */
(function (module) {
  'use strict';

  /**
   * The season screen controller.
   * @constructor SeasonController
   * @param {Object} $scope - The associated Angular $scope object.
   * @param {Object} $ionicPopup - The Ionic $ionicPopup service.
   * @param {Object} calendarService - The calendar service.
   * @param {Object} show - The resolved show JSON object.
   * @param {Object} season - The resolved season JSON object.
   */
  function SeasonController(
    $scope,
    $ionicPopup,
    calendarService,
    show,
    season
  ) {
    var controller = this;

    /**
     * The resolved season JSON object.
     * @property {Object} season
     */
    $scope.season = season;

    /**
     * Check whether a given episode has not aired yet.
     * @method hasNotAiredYet
     * @param {Object} episode - A JSON episode object.
     * @return {Boolean}
     */
    controller.hasNotAiredYet = function (episode) {
      return !!episode.date && moment.utc().isBefore(episode.date);
    };

    /**
     * Add a given episode as an event in the device calendar.
     * @method addToCalendar
     * @param {Object} episode - A JSON episode object.
     */
    controller.addToCalendar = function (episode) {
      $ionicPopup.confirm({
        template: 'Create an event in your device calendar?',
        title: episode.name
      }).then(function (ok) {
        if (ok) { calendarService.addEpisode(show, season, episode); }
      });
    };
  }

  module.controller('seasonController', [
    '$scope',
    '$ionicPopup',
    'calendarService',
    'show',
    'season',
    SeasonController
  ]);

}(angular.module('app.show.season')));
