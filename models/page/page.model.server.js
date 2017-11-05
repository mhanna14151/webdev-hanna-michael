var mongoose = require('mongoose');
var PageSchema = mongoose.Schema({
  _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
  name: String,
  title: String,
  description: String,
  widgets: [Widget],
  dateCreated: Date
}, {collection: 'page'});

module.exports = WebsiteSchema;
