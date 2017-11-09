var mongoose = require('mongoose');
var WidgetSchema = require('../widget/widget.schema.server');

var PageSchema = mongoose.Schema({
  websiteId: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
  name: String,
  title: String,
  description: String,
  widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
  dateCreated: Date
}, {collection: 'page'});

module.exports = PageSchema;
