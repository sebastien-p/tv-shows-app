/**
 * @memberOf app.show
 */
(function (module) {
  'use strict';

  /**
   * The season screen controller.
   * @constructor SeasonController
   * @param {Object} $scope - The associated Angular $scope object.
   * @param {Object} calendarService - The calendar service.
   * @param {Object} show - The resolved show JSON object.
   * @param {Object} season - The resolved season JSON object.
   */
  function SeasonController($scope, calendarService, show, season) {
    var controller = this;

    /**
     * The resolved season JSON object.
     * @property {Object} season
     */
    $scope.season = season;

    controller.hasNotAiredYet = function (episode) { debugger;
      return moment.utc().isBefore(episode.date); // TODO: check if no date? + move to calendarService
    };

    controller.addToCalendar = function (episode) { debugger; // TODO: $ionicPopup
      return calendarService.addEpisode(show, season, episode);
    };
  }

  module.controller('seasonController', [
    '$scope',
    'calendarService',
    'show',
    'season',
    SeasonController
  ]);

}(angular.module('app.show.season')));
