/**
 * @module app.show
 * @memberOf app
 */
(function (module) {
  'use strict';

  /**
   * Get a show season episodes the ID and number present in the url.
   * @private
   * @function seasonResolver
   * @param {Object} $stateParams - The Angular UI Router $stateParams service.
   * @param {[type]} showsService - The shows service.
   * @return {Promise}
   */
  function seasonResolver($stateParams, showsService) {
    return showsService.getSeason(
      $stateParams.showId,
      $stateParams.seasonNumber
    );
  }

  /**
   * Define the module's configuration.
   * @private
   * @function config
   * @param {Object} $stateProvider - UI Router $stateProvider service.
   * @param {Object} templateUtils - Some template utilities.
   */
  function config($stateProvider, templateUtils) {
    $stateProvider.state('show.season', {
      url: '/season/{seasonNumber}',
      views: {
        '@': {
          templateUrl: templateUtils.getUrlFromModule(module),
          controller: 'seasonController as controller'
        }
      },
      resolve: {
        season: ['$stateParams', 'showsService', seasonResolver]
      }
    });
  }

  module.config(['$stateProvider', 'templateUtilsProvider', config]);

}(angular.module('app.show.season', ['app.show'])));
