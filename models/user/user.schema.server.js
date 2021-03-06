var mongoose = require('mongoose');
// var WebsiteSchema = require('../website/website.schema.server')


var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
  dateCreated: Date,
  facebook: {
    id:    String,
    token: String
  }

}, {collection: 'user'});

module.exports = UserSchema;
