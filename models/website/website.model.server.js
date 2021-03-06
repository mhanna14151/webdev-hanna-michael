var mongoose = require('mongoose');
var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
var UserModel = require('../user/user.model.server');

WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

module.exports = WebsiteModel;

function createWebsiteForUser(website) {
  // return WebsiteModel.create(website);

  var newWebsite = null;
  return WebsiteModel
    .create(website)
    .then(function (website) {
      newWebsite = website;
      UserModel
        .findUserById(newWebsite.developerId)
        .then(function (user) {
          user.websites.push(newWebsite);
          return user.save();
        });
    });
}


function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({developerId: userId})
    .populate('developerId', 'username')
    .exec();
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findOne({_id: websiteId});
}

function updateWebsite(websiteId, website) {
  return WebsiteModel.updateOne({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
  var websiteThis = WebsiteModel.findWebsiteById(websiteId)
    .then(function(website) {
      websiteThis = website;
      UserModel.findUserById(websiteThis.developerId)
        .then(function(user) {
          for (var i = 0; i < user.websites.length; i++) {
            if (user.websites[i]._id = websiteId) {
              user.websites.splice(i, 1);
              user.save();
            }
          }
        });
    });
  return WebsiteModel.deleteOne({_id: websiteId});
}
