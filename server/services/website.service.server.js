var Website = require('../model/website.model.server');

module.exports = function(app) {

  var websites = [
    new Website('123', 'Facebook', '456', 'Lorem'),
    new Website('234', 'Tweeter', '456', 'Lorem'),
    new Website('456', 'Gizmodo', '456', 'Lorem'),
    new Website('890', 'Go', '123', 'Lorem'),
    new Website('567', 'Tic Tac Toe', '123', 'Lorem'),
    new Website('678', 'Checkers', '123', 'Lorem'),
    new Website('789', 'Chess', '234', 'Lorem')
  ];

  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);




  /**
   * Returns a different set of users based on conditions.
   * @param req
   * @param res
   */
  function findAllWebsitesForUser(req, res) {
    var userId = req.query["uid"];
    var websiteId = req.query["wid"];
    var usersWebsites: Website[];
    for (var i = 0; i < websites.legnth; i++) {
      if (websites[i].developerId = userId) {
        usersWebsites.push(websites[i]);
      }
    }
    res.json(usersWebsites);
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params["wid"];
    var website = users.find(function (website) {
      "use strict";
      return website._id === websiteId
    });
    res.json(website);
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['wid'];
    var newWebsite = req.body;
    for (var i = 0; i < websites.length; i++) {
      if (websites[i]._id === websiteId) {
        websites[i] = newWebsite;
        res.json(websites);
        return;
      }
    }
  }


  function deleteWebsite(req, res) {
    var websiteId = req.params['wid'];
    for (var i = 0; i < users.length; i++) {
      if (websites[i]._id === websiteId) {
        websites.splice(i, 1);
        // var users = findUsers(req, res);
        res.json(websites);
        return;
      }
    }
  }

  function createWebsite(req, res) {
    const website = req.body;
    var newWebsite = new Website(website._id, website.name, website.developerId, website.description);
    // var newUser = new User('15', 'f', 'f', 'f@gmail.com', 'f', 'f');
    // console.log("user from Server: ");
    websites.push(newWebsite);
    res.json(newWebsite);
  }

};
