/**
 * WatchHistoryController
 *
 * @description :: Server-side logic for managing watchhistories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add(req, res){
    let userId = req.session.userId;
    let movie = req.body.movie;
    let watchDate = req.body.watchDate;
    
    if(!movie || !watchDate){
      return res.badRequest('Movie or watch date missing');
    }
    
    WatchHistory.create({
      watchedBy: userId,
      movie: movie,
      watchDate: watchDate
    }).exec(function(err){
      if(err){
        return res.serverError(err);
      }
      
      res.redirect("/");
    });
  }
};

