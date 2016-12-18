/**
 * MovieController
 *
 * @description :: Server-side logic for managing Movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		Movie.find().exec(function(err, movies){
			if(err){
				return res.serverError(err);
			}
			res.view({
				movies: movies
			});
		});
  },
	searchImdb: function(req, res){
    ImdbService
			.query({ name: req.param("name", ""), year: req.param("year", null) })
			.then(function(movie){
				res.json(movie);
			})
			.catch(function(err){
				res.json(404, err);
			})
	}
};

