let imdb = require("imdb-api");

module.exports = {
  findMovieByTitle: function(movieTitle){
    return imdb.get(movieTitle);
  },
  findMovieById: function(imdbId){
    return imdb.getById(imdbId);
  },
  query: function(query){
    return imdb.getReq(query);
  }
};