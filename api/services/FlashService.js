module.exports = {
  addFlash: function(req, message, type){
    req.session.flashes.push({
      message: message,
      type: type || "info"
    });
  }
};