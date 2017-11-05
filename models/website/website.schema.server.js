var mongoose = require('mongoose');
var WebsiteSchema = mongoose.Schema({
  _user: {ref: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  password: String,
  name: String,
  description: String,
  pages: String,
  dateCreated: Date
}, {collection: 'website'});

module.exports = WebsiteSchema;
