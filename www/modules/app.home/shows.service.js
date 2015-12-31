/**
 * @memberOf app.home
 */
(function (module) {
  'use strict';

  /**
   * The shows service.
   * @constructor ShowsService
   * @param {Object} $q - The Angular $q service.
   * @param {Object} $http - The Angular $http service.
   * @param {Object} cacheUtils - Some caching utilities.
   * @param {String} SHOWS_API_URL - The shows API url.
   * @param {String} SHOWS_ART_API_URL - The shows art API url.
   * @param {String} SHOWS_ART_API_KEY - The shows art API key.
   */
  function ShowsService(
    $q,
    $http,
    cacheUtils,
    SHOWS_API_URL,
    SHOWS_ART_API_URL,
    SHOWS_ART_API_KEY
  ) {
    var service = this;

    /**
     * Get a persistant cache associated to the module.
     * @private
     * @function getModuleCache
     * @return {Object}
     */
    function getModuleCache() { return cacheUtils.getModuleCache(module); }

    /**
     * Return the $http response data.
     * @method toData
     * @param {Object} response - A $http reponse object.
     * @return {*}
     */
    function toData(response) { return response.data; }

    /**
     * Get resources.
     * @private
     * @function get
     * @param {String} url
     * @param {Object} [params] - Params to pass in the query string.
     * @return {Promise}
     */
    function get(url, params) {
      return $http.get(url, { params: params }).then(toData);
    }

    /**
     * Get resources using JSONP.
     * @private
     * @function jsonp
     * @param {String} url - String to append to SHOWS_API_URL.
     * @param {Object} [params] - Params to pass in the query string.
     * @return {Promise}
     */
    function jsonp(url, params) {
      params = _.extend({ callback: 'JSON_CALLBACK', s: 'thetvdb' }, params);
      return $http.jsonp(SHOWS_API_URL + url, { params: params }).then(toData);
    }

    /**
     * Search for TV shows matching a given query.
     * @method search
     * @param {String} query
     * @return {Promise}
     */
    service.search = function (query) { return jsonp('', { name: query }); };

    /**
     * Get a TV show informations given its ID.
     * @method getShow
     * @param {String} id
     * @return {Promise}
     */
    service.getShow = function (id) {
      return jsonp('/' + id + '/info').then(function (show) {
        show.id = id;
        show.favorite = service.isFavoriteShow(show);
        return show;
      });
    };

    /**
     * Get a TV show season episodes given its ID and the season number.
     * @method getSeason
     * @param {String} showId
     * @param {Number} seasonNumber
     * @return {Promise}
     */
    service.getSeason = function (showId, seasonNumber) {
      return jsonp('/' + showId + '/season/' + seasonNumber);
    };

    /**
     * Get a TV show art given its ID.
     * @method getShowArt
     * @param {String} id
     * @return {Promise}
     */
    service.getShowArt = function (id) {
      var params = { api_key: SHOWS_ART_API_KEY };
      function fallback() { return { thetvdb_id: id }; }
      return get(SHOWS_ART_API_URL + id, params).catch(fallback);
    };

    /**
     * Search for TV shows matching a given query, including art in results.
     * @method searchWithArt
     * @param {String} query
     * @return {Promise}
     */
    service.searchWithArt = function (query) {
      return service.search(query).then(function (results) {
        var promises = _(results).pluck('id').map(service.getShowArt).value();
        return $q.all(promises).then(function (arts) {
          return _.each(results, function (result, index) {
            var art = _.findWhere(arts[index].tvthumb, { lang: 'en' });
            result.art = art ? art.url : null;
          });
        });
      });
    };

    /**
     * Get a TV show informations given its ID, including art in results.
     * @method getShowWithArt
     * @param {String} id
     * @return {Promise}
     */
    service.getShowWithArt = function (id) {
      return $q.all({
        arts: service.getShowArt(id),
        show: service.getShow(id)
      }).then(function (resolved) {
        return _.extend(resolved.show, {
          art: _.chain(resolved.arts.tvposter)
            .where({ lang: 'en' })
            .take(5)
            .pluck('url')
            .value()
        });
      });
    };

    /**
     * Get favorite shows.
     * @method getFavoriteShows
     * @return {Array} Can be empty.
     */
    service.getFavoriteShows = function () {
      return getModuleCache().get('favorites') || [];
    };

    /**
     * Check if a given show is part of the favorite list.
     * @method isFavoriteShow
     * @param {Object} show - A JSON show object containing an `id` property.
     * @return {Boolean}
     */
    service.isFavoriteShow = function (show) {
      return !!_.findWhere(service.getFavoriteShows(), _.pick(show, 'id'));
    };

    /**
     * Add or remove a given show to/from the favorite list.
     * @method setShowFavoriteStatus
     * @param {Object} show - A JSON show object containing some
     *   `id`, `name` and `fromYear` properties.
     * @param {Boolean} status - Add if `true`, remove if `false`.
     */
    service.setShowFavoriteStatus = function (show, status) {
      var favorite = service.getFavoriteShows();
      if (!status) { _.remove(favorite, _.pick(show, 'id')); }
      else if (service.isFavoriteShow(show)) { return; }
      else { favorite.push(_.pick(show, 'id', 'name', 'fromYear')); }
      getModuleCache().put('favorites', favorite);
    };
  }

  module.service('showsService', [
    '$q',
    '$http',
    'cacheUtils',
    'SHOWS_API_URL',
    'SHOWS_ART_API_URL',
    'SHOWS_ART_API_KEY',
    ShowsService
  ]);

}(angular.module('app.home')));
