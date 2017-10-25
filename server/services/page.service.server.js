var Page = require('../model/page.model.server');

module.exports = function(app) {

  var pages = [
    new Page('321', 'Post 1', '456', 'Lorem'),
    new Page('432', 'Post 2', '456', 'Lorem'),
    new Page('543', 'Post 3', '456', 'Lorem')
  ];

  app.get("/api/website/:wid/page", findAllPagesForWebsite);
  app.get("/api/page/:pid", findPageById);
  app.put("/api/page/:pid", updatePage);
  app.delete("/api/page/:pid", deletePage);
  app.post("/api/website/:wid/page", createPage);


  /**
   * Returns a different set of users based on conditions.
   * @param req
   * @param res
   */
  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["wid"];
    console.log('this is the wid from this thing  ' + websiteId);
    // var websiteId = req.query["wid"];
    var usersPages = [];
    console.log('length of pages ' + pages.length);
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].website._id === websiteId) {
        usersPages.push(pages[i]);
      }
    }
    res.json(usersPages);
  }

  function findPageById(req, res) {
    var pageId = req.params["pid"];
    var page = pages.find(function (page) {
      "use strict";
      return page._id === pageId
    });
    res.json(page);
  }

  function updatePage(req, res) {
    var pageId = req.params['pid'];
    var newPage = req.body;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i]._id === pageId) {
        pages[i] = newPage;
        res.json(pages);
        return;
      }
    }
  }


  function deletePage(req, res) {
    var pageId = req.params['pid'];
    for (var i = 0; i < websites.length; i++) {
      if (websites[i]._id === websiteId) {
        websites.splice(i, 1);
        // var users = findUsers(req, res);
        res.json(websites);
        return;
      }
    }
  }

  function createPage(req, res) {
    const page = req.body;
    var newPage = new Page(page._id, page.name, page.websiteId, page.description);
    // var newUser = new User('15', 'f', 'f', 'f@gmail.com', 'f', 'f');
    // console.log("user from Server: ");
    pages.push(newPage);
    res.json(newPage);
  }

};
