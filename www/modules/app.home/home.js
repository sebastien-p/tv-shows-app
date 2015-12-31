/**
 * @module app.home
 * @memberOf app
 */
(function (module) {
  'use strict';

  /**
   * Get favorite shows.
   * @private
   * @function favoritesResolver
   * @param {[type]} showsService - The shows service.
   * @return {Array}
   */
  function favoritesResolver(showsService) {
    return showsService.getFavoriteShows();
  }

  /**
   * Define the module's configuration.
   * @private
   * @function config
   * @param {Object} $stateProvider - UI Router $stateProvider service.
   * @param {Object} templateUtils - Some template utilities.
   */
  function config($stateProvider, templateUtils) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        '': {
          templateUrl: templateUtils.getUrlFromModule(module),
          controller: 'homeController as controller'
        }
      },
      resolve: {
        favorites: ['showsService', favoritesResolver]
      }
    });
  }

  module.config(['$stateProvider', 'templateUtilsProvider', config]);

}(angular.module('app.home', ['fp.utils'])));
