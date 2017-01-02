/**
 * MovieController
 *
 * @description :: Server-side logic for managing Movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Movie.find()
      .populate('watches',{
        where: {
          watchedBy: req.session.userId
        }
      })
      .exec(function (err, movies) {
      if (err) {
        return res.serverError(err);
      }
      res.view({
        movies: movies,
        user: req.session.userId
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
  },
  create: function (req, res){
    if(req.body){
      if(!req.body.imdb_id){
        return res.badRequest('IMDB ID is required to create a movie.');
      }
      return Movie.create(req.body).exec(function(err, records){
        if(err){
          FlashService.addFlash(req, err.message, "danger");
          return res.view();
        }
  
        FlashService.addFlash(req, records.title+" was added to the database.", "success");
        return res.redirect("/");
      });
    }
    res.view();
  }
};

