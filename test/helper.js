const jwt = require('jsonwebtoken');

exports.generateTokenFromUser = user => {
  return jwt.sign(user, process.env.JWT_SECRET);
}
exports.authHeader = (token) => {
	return `Bearer ${token}`;
}