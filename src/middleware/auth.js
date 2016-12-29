const jwt = require('jsonwebtoken');
import User from '../models/user';

const authMiddleware = exports.authMiddleware = function authMiddleware(req, res, next) {
  const {authorization} = req.headers;
  
  if (!authorization) {
    return next(new Error('Invalid or missing token'));
  }

  const token = authorization.split('Bearer ')[1];
  const decoded = jwt.decode(token);


  if (!decoded) {
    return res.send({
      error: 'Invalid token.'
    });
  }
  
  User.findById(decoded._doc._id)
    .then((user) => {
      if (!user) {
        throw new Error('No user matching the decoded token found');
      }
      req.user = user;
      return next();
    })
    .catch((e) => {
      return next(e);
    });
};