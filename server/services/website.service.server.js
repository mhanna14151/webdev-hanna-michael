var Website = require('../model/website.model.server');

module.exports = function(app) {

  var websiteModel = require("../../models/website/website.model.server");


  var websites = [
    new Website("123", "Facebook", "456", "Lorem"),
    new Website("234", "Tweeter", "456", "Lorem"),
    new Website("456", "Gizmodo", "456", "Lorem"),
    new Website("890", "Go", "123", "Lorem"),
    new Website("567", "Tic Tac Toe", "123", "Lorem"),
    new Website("678", "Checkers", "123", "Lorem"),
    new Website("789", "Chess", "234", "Lorem")
  ];

  app.get("/api/user/:uid/website", findAllWebsitesForUser);
  app.get("/api/website/:wid", findWebsiteById);
  app.put("/api/website/:wid", updateWebsite);
  app.delete("/api/website/:wid", deleteWebsite);
  app.post("/api/user/:uid/website", createWebsite);


  /**
   * Returns a different set of users based on conditions.
   * @param req
   * @param res
   */
  function findAllWebsitesForUser(req, res) {
    var userId = req.params["uid"];
    // var promise = websiteModel
    //   .findAllWebsitesForUser(userId);
    // promise.then(function (websites) {
    //   res.json(websites)
    // });
    //
    websiteModel.findAllWebsitesForUser(userId)
      .then(function(websites) {
        res.json(websites);
    });

    // return;


    // var websiteId = req.query["wid"];
    // var usersWebsites = [];
    // // for (var i = 0; i < websites.length; i++) {
    // //   if (websites[i].developerId === userId) {
    // //     usersWebsites.push(websites[i]);
    // //   }
    // // }
    // // res.json(usersWebsites);
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params["wid"];
    var promise = websiteModel
      .findWebsiteById(websiteId);
    promise.then(function(website) {
      "use strict";
      res.json(website)
    });
    // var websiteId = req.params["wid"];
    // var website = websites.find(function (website) {
    //   "use strict";
    //   return website._id === websiteId
    // });
    // res.json(website);
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['wid'];
    var newWebsite = req.body;

    websiteModel.updateWebsite(websiteId, newWebsite)
      .then(function (status) {
        res.send(status);
      });
    //
    //
    //
    // for (var i = 0; i < websites.length; i++) {
    //   if (websites[i]._id === websiteId) {
    //     websites[i] = newWebsite;
    //     res.json(websites);
    //     return;
    //   }
    // }
  }


  function deleteWebsite(req, res) {
    var websiteId = req.params['wid'];
    websiteModel.deleteWebsite(websiteId)
      .then(function(status) {
        res.send(status);
      });
  }

  function createWebsite(req, res) {
    var userId = req.params['uid'];
    var website = req.body;
    website.developerId = userId;
    delete website._id;

    websiteModel
      .createWebsiteForUser(website)
      .then(function(website) {
        websiteModel
          .findAllWebsitesForUser(userId)
          .then(function(websites) {
            res.json(websites);
          });
      });
  }

};
