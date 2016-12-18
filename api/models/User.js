/**
 * User.js
 *
 * @description :: User accounts
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

module.exports = {
  
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
      maxLength: 50
    },
    verifyPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  },
  
  beforeCreate: function (attrs, cb) {
    bcrypt.hash(attrs.password, SALT_WORK_FACTOR, function (err, hash) {
      attrs.password = hash;
      return cb();
    });
  },
  
  beforeUpdate: function (attrs, cb) {
    if(attrs.newPassword){
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err){
          return cb(err);
        }
        
        bcrypt.hash(attrs.newPassword, salt, function(err, crypted) {
          if(err){
            return cb(err);
          }
          
          delete attrs.newPassword;
          attrs.password = crypted;
          return cb();
        });
      });
    } else {
      return cb();
    }
  },
  
  attemptLogin: function(name, password, cb){
    this.find({
      where: {
        name: name
      }
    }).exec(function(err, results){
      if(err){
        return cb(err);
      }
      let result = results.pop();
      if(!result){
        let err = new Error("Not Found");
        return cb(err);
      }
      
      let passwordCheck = result.verifyPassword(password);
      
      return cb(!passwordCheck, passwordCheck && result);
    });
  }
};

