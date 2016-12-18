/**
 * Movie.js
 *
 * @description :: Movies
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    imdb_id: {
      required: true,
      unique: true,
      type: 'string'
    },
    imdb_data: {
      type: 'json'
    }
  },
  beforeCreate: function (attrs, cb) {
    ImdbService.findMovieById(attrs.imdb_id)
      .then(function (data) {
        attrs.imdb_data = data;
      })
      .then(function () {
        if (!attrs.title) {
          attrs.title = attrs.imdb_data.title;
        }
      })
      .then(function () {
        cb();
      })
      .catch(cb);
  }
};

