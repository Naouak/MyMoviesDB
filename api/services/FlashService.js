module.exports = {
  addFlash: function(req, message){
    req.session.flashes.push({
      message: message
    });
  }
};