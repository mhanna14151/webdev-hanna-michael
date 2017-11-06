var Page = require('../model/page.model.server');

module.exports = function(app) {

  var pageModel = require("../../models/page/page.model.server");

  var pages = [
    new Page("321", "Post 1", "456", "Lorem"),
    new Page("432", "Post 2", "456", "Lorem"),
    new Page("543", "Post 3", "456", "Lorem")
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
    var websiteId = req.params['wid'];
    pageModel
      .findAllPagesForWebsite(websiteId)
      .then(function(pages) {
        res.json(pages);
      });
    // var usersPages = [];
    // console.log('length of pages ' + pages.length);
    // for (var i = 0; i < pages.length; i++) {
    //   if (pages[i].websiteId === websiteId) {
    //     usersPages.push(pages[i]);
    //   }
    // }
    // res.json(usersPages);
  }

  function findPageById(req, res) {
    var pageId = req.params["pid"];
    var promise = pageModel
      .findPageById(pageId);
    promise.then(function(page) {
      res.json(page)
    });
    //
    // var page = pages.find(function (page) {
    //   return page._id === pageId
    // });
    // res.json(page);
  }

  function updatePage(req, res) {
    var pageId = req.params['pid'];
    var newPage = req.body;

    pageModel.updatePage(pageId, newPage)
      .then(function (status) {
        res.send(status);
      });
    // //
    // // for (var i = 0; i < pages.length; i++) {
    // //   if (pages[i]._id === pageId) {
    // //     pages[i] = newPage;
    // //     res.json(newPage);
    // //     return;
    // //   }
    // }
  }

  function deletePage(req, res) {
    var pageId = req.params['pid'];
    pageModel.deletePage(pageId)
      .then(function(status) {
        "use strict";
        res.send(status);
      });
    //
    //
    // for (var i = 0; i < pages.length; i++) {
    //   if (pages[i]._id === pageId) {
    //     pages.splice(i, 1);
    //     // var users = findUsers(req, res);
    //     res.json(pages);
    //     return;
    //   }
    // }
  }

  function createPage(req, res) {
    var websiteId = req.params['wid'];
    const page = req.body;
    page.websiteId = websiteId;
    delete page._id;

    pageModel
      .createPage(page)
      .then(function(page) {
        "use strict";
        pageModel
          .findAllPagesForWebsite(websiteId)
          .then(function(pages) {
            res.json(pages);
          });
      });
    // var newPage = new Page(page._id, page.name, websiteId, page.description);
    // // var newUser = new User('15', 'f', 'f', 'f@gmail.com', 'f', 'f');
    // // console.log("user from Server: ");
    // pages.push(newPage);
    // res.json(newPage);
  }

};
