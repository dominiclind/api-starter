/*

  # APP DOMAIN: 
  Auth
  
  # DESCRIPTION: 
  Handles app authentication
  

*/

import passport from 'passport';
const jwt = require('jsonwebtoken');

/*functions*/
// POST /auth/login
exports.fbLogin = (req, res, next) => {
  passport.authenticate('custom', (err, user) => {
    if (err) { return next(err) }
    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.send({
        token,
        user
      });
    }
  })(req, res, next);
};