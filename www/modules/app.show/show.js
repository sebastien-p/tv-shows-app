/**
 * @module app.show
 * @memberOf app
 */
(function (module) {
  'use strict';

  /**
   * Get a show informations given the ID present in the url.
   * @private
   * @function showResolver
   * @param {Object} $stateParams - The Angular UI Router $stateParams service.
   * @param {[type]} showsService - The shows service.
   * @return {Promise}
   */
  function showResolver($stateParams, showsService) {
    return showsService.getShow($stateParams.showId);
  }

  /**
   * Define the module's configuration.
   * @private
   * @function config
   * @param {Object} $stateProvider - UI Router $stateProvider service.
   * @param {Object} templateUtils - Some template utilities.
   */
  function config($stateProvider, templateUtils) {
    $stateProvider.state('show', {
      url: '/show/{showId}',
      views: {
        '': {
          templateUrl: templateUtils.getUrlFromModule(module),
          controller: 'showController as controller'
        }
      },
      resolve: {
        show: ['$stateParams', 'showsService', showResolver]
      }
    });
  }

  module.config(['$stateProvider', 'templateUtilsProvider', config]);

}(angular.module('app.show', ['app.home'])));
