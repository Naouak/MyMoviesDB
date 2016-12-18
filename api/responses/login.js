/**
 * Created by Naouak on 14/12/2016.
 */
/**
 *
 * @param inputs Object
 * @param success Function
 * @param fail Function
 */
module.exports = function login(inputs, success, fail){
  let req = this.req;
  let res = this.res;
  
  fail = fail || function(){res.forbidden();};
  
  if(!inputs){
    let error = new Error("Missing inputs");
    return fail(error);
  }
  
  User.attemptLogin(inputs.name, inputs.password, function(err, user){
    if(err){
      return fail(err);
    }
    return success(user);
  });
  
};