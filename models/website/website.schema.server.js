var mongoose = require('mongoose');
var WebsiteSchema = mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  name: String,
  description: String,
  pages: [Page],
  dateCreated: Date
}, {collection: 'website'});

module.exports = WebsiteSchema;
