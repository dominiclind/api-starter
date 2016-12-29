const mongoose = require('mongoose');

exports = module.exports = (connectionString) => {
  console.log(`Connecting to the database using ${connectionString}`);
  mongoose.connect(connectionString);
  const models = require('./models');
  return models;
};