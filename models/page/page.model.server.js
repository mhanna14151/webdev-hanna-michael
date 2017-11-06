
var mongoose = require('mongoose');
var PageSchema = require("./page.schema.server");
var PageModel = mongoose.model("PageModel", PageSchema);
var WebsiteModel = require('../website/website.model.server');

PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;

function createPage(page) {
  // return PageModel.create(page);
  var newPage = null;
  return PageModel
    .create(page)
    .then(function (page) {
      newPage = page;
      WebsiteModel
        .findWebsiteById(newPage.websiteId)
        .then(function (website) {
          website.pages.push(newPage);
          return website.save();
        });
    });
}


function findAllPagesForWebsite(websiteId) {
  return PageModel.find({websiteId: websiteId})
    .populate('websiteId')
    .exec();
}

function findPageById(pageId) {
  return PageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
  return PageModel.updateOne({_id: pageId}, page);
}


function deletePage(pageId) {
  var pageThis = PageModel.findPageById(pageId)
    .then(function(page) {
      pageThis = page;
      WebsiteModel.findWebsiteById(pageThis.websiteId)
        .then(function(website) {
          for (var i = 0; i < website.pages.length; i++) {
            if (website.pages[i]._id = pageId) {
              website.pages.splice(i, 1);
              website.save();
            }
          }
        });
    });
  return PageModel.deleteOne({_id: pageId});
}
