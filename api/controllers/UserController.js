/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: (req, res) => {
    if(req.session.authenticated){
      return res.redirect("/");
    }
    
    if(!req.body || !req.body.name || !req.body.password){
      res.view();
      return;
    }
    res.login({name: req.body.name, password: req.body.password}, function(){
      //Success
      req.session.authenticated = true;
      FlashService.addFlash(req, "You are logged in", "success");
      res.redirect("/");
    }, function(err){
      //Fail
      req.session.authenticated = false;
      res.send(JSON.stringify(err));
      res.end();
    });
  },
  logout: (req, res) => {
    req.session.authenticated = false;
    FlashService.addFlash(req, "You are logged out", "success");
    res.redirect("/");
  },
  signup: (req, res) => {
    if(!req.body || !req.body.name || !req.body.password){
      return res.redirect("user/login");
    }
    User.create({
      name: req.body.name,
      password: req.body.password
    }).exec(function(err, user){
      if(err){
        FlashService.addFlash(req, "Could not create your account", "danger");
        return res.view("User/login");
      }
      
      FlashService.addFlash(req, "Account created. You are now logged in.", "success");
      req.session.authenticated = true;
      return res.redirect("/");
    });
  }
};

