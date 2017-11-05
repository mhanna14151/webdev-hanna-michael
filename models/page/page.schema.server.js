var mongoose = require('mongoose');
var PageSchema = require("./page.schema.server");
var PageModel = mongoose.model("PageModel", PageSchema);
PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageByid = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;


