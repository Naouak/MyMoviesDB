/**
 * MovieController
 *
 * @description :: Server-side logic for managing Movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Movie.find().exec(function (err, movies) {
      if (err) {
        return res.serverError(err);
      }
      res.view({
        movies: movies
      });
    });
  },
  searchImdb: function (req, res) {
    ImdbService
      .query({
        name: req.param("title", null),
        year: req.param("year", null),
        id: req.param("imdbid", null)
      }, function (err, movie) {
        if (err) {
          sails.log(err);
          return res.json(404, err);
        }
        return res.json(movie);
      });
  }
};

