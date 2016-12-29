/*

  # NAME: 
  Item
  # DESCRIPTION: 
  model of tracked item
  # MONGOOSE SCHEMA:
  http://mongoosejs.com/docs/schematypes.html

*/

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  label: { type: String },
  created: { type: Date, default: Date.now },
  reminders: [Date],
});

export default mongoose.model('Item', ItemSchema);