/**
 * @memberOf app.show.season
 */
(function (module) {
  'use strict';

  /**
   * The calendar service.
   * @constructor CalendarService
   * @param {Object} $cordovaCalendar - ngCordova $cordovaCalendar service.
   * @param {Object} $cordovaVibration - ngCordova $cordovaVibration service.
   * @param {Object} cordovaUtils - Some Cordova utilities.
   */
  function CalendarService($cordovaCalendar, $cordovaVibration, cordovaUtils) {
    var service = this;

    /**
     * Add a zero before a given number if number is lower than ten.
     * @private
     * @function pad
     * @param {Number} number
     * @return {String}
     */
    function pad(number) { return _.padLeft(number, 2, 0); }

    /**
     * Provide user feedback showing a toast and making the device vibrate.
     * @private
     * @function feedback
     * @param {String} message - The toast message.
     * @param {Number} vibrations - Number of timbes the device should vibrate.
     */
    function feedback(message, vibrations) {
      $cordovaVibration.vibrate(_.fill(new Array(vibrations), 250));
      cordovaUtils.showToast(message);
    }

    /**
     * Create an event in the device calendar.
     * @method createEvent
     * @param {*} date - The date/time of the event, should parse as a date.
     * @param {String} title
     * @param {String} [notes]
     * @return {Promise}
     */
    service.createEvent = function (date, title, notes) {
      return cordovaUtils.callWhenReady(function () {
        date = moment.utc(date);
        return $cordovaCalendar.createEvent({
          endDate: date.clone().add(1, 'hour').toDate(),
          startDate: date.toDate(),
          title: title,
          notes: notes
        });
      });
    };

    /**
     * Add an episode in the device calendar.
     * @method addEpisode
     * @param {Object} show - A show JSON object.
     * @param {Object} season - A season JSON object.
     * @param {Object} episode - An episode JSON object.
     * @return {Promise}
     */
    service.addEpisode = function (show, season, episode) {
      var number = 'S' + pad(season.number) + 'E' + pad(episode.number);
      var title = show.name + ' - ' + number;
      return service.createEvent(episode.date, title, episode.name)
        .then(function () { feedback('Calendar event added', 1); })
        .catch(function () { feedback('Oops, calendar event not added', 2); });
    };
  }

  module.service('calendarService', [
    '$cordovaCalendar',
    '$cordovaVibration',
    'cordovaUtils',
    CalendarService
  ]);

}(angular.module('app.show.season')));
