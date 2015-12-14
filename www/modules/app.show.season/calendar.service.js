(function (module) {
  'use strict';

  function CalendarService($cordovaCalendar, $cordovaVibration, cordovaUtils) {
    var service = this;

    service.addEpisode = function (show, season, episode) {

    };
  }

  module.service('calendarService', [
    '$cordovaCalendar',
    '$cordovaVibration',
    'cordovaUtils',
    CalendarService
  ]);

}(angular.module('app.show.season')));
