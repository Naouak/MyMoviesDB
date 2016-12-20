module.exports = function(req, res, next){
  res.locals.loggedIn = req.session.authenticated || false;
  return next();
};