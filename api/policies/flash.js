module.exports = function(req, res, next){
  res.locals.flashes = req.session.flashes||[];
  req.session.flashes = [];
  return next();
};