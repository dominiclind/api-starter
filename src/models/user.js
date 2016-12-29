/*

  # NAME: 
  User
  # DESCRIPTION: 
  app model for the user
  # MONGOOSE SCHEMA:
  http://mongoosejs.com/docs/schematypes.html

*/

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  facebookId: { type: String },
  dateCreated: { type: Date, default: Date.now },
  profilePicture: { type: String }
});


let UserModel;
try {
  UserModel = mongoose.model('User');
} catch (error) {
  UserModel = mongoose.model('User', UserSchema);
}
export default UserModel;