var Widget = require('../model/widget.model.server');

module.exports = function(app) {

  var widgetModel = require("../../models/widget/widget.model.server");
  var pageModel = require("../../models/page/page.model.server");

  var multer = require('multer');
  var upload = multer({ dest:__dirname + '/../../dist/assets/uploads'});

  app.get("/api/page/:pid/widget", findAllWidgetsForPage);
  app.get("/api/widget/:wgid", findWidgetById);
  app.put("/api/widget/:wgid", updateWidget);
  app.put("/api/page/:pid/widget", reorderWidget);
  app.delete("/api/widget/:wgid", deleteWidget);
  app.post("/api/page/:pid/widget", createWidget);
  app.post("/api/upload", upload.single('myFile'), uploadImage);


  /**
   * Returns a different set of users based on conditions.
   * @param req
   * @param res
   */
  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pid'];
    widgetModel
      .findAllWidgetsForPage(pageId)
      .then(function(widgets) {
        res.json(widgets);
      });
  }


  function findWidgetById(req, res) {
    var widgetId = req.params["wgid"];
    widgetModel.findWidgetById(widgetId)
      .then(function(widget) {
        "use strict";
        res.json(widget);
      });
  }

  function updateWidget(req, res) {
    console.log('updating widget service activated');
    var widgetId = req.params['wgid'];
    var newWidget = req.body;
    widgetModel.updateWidget(widgetId, newWidget)
      .then(function (status) {
        res.send(status);
      });
  }


  function deleteWidget(req, res) {
    var widgetId = req.params['wgid'];
    widgetModel.deleteWidget(widgetId)
      .then(function(status) {
        "use strict";
        res.send(status);
      });
  }

  function createWidget(req, res) {
    var pageId = req.params['pid'];
    const widget = req.body;
    widget.pageId = pageId;
    delete widget._id;
    widgetModel
      .createWidget(widget)
      .then(function(widget) {
        widgetModel
          .findAllWidgetsForPage(pageId)
          .then(function(widgets) {
            res.json(widgets);
          });
      });
  }


  function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var newWidget = null;
    widgetModel.findWidgetById(widgetId)
      .then(function(widget) {
        newWidget = widget;
        newWidget.url = '/assets/uploads/'+filename;
        widgetModel.updateWidget(widgetId, newWidget)
          .then(function(widget1) {
            var callbackUrl   = "/user/"+userId+"/website/"+websiteId+ '/page/' + pageId + '/widget';
            res.redirect(callbackUrl);
          });
      });
  }

  function reorderWidget(req, res) {
    console.log('entered the reorder service');
    var pageId = req.params['pid'];
    var start = req.query['initial'];
    var end = req.query['final'];
    widgetModel.reorderWidget(pageId, start, end)
      .then(function(widgets) {
        console.log('exiting here');
        res.json(widgets);
      });
    console.log('exiting');
    //
    // var AllWidgets = null;
    // var movedWidget = null;
    // widgetModel
    //   .findAllWidgetsForPage(pageId)
    //   .then(function (widgets) {
    //     AllWidgets = widgets;
    //     movedWidget = AllWidgets[start];
    //     AllWidgets.splice(start, 1);
    //     AllWidgets.splice(end, 0, movedWidget);
    //     pageModel
    //       .findPageById(pageId)
    //       .then(function (page) {
    //         page.widgets = AllWidgets;
    //         res.json(page.widgets);
    //         return page.save();
    //       });
    //   });
    // widgetModel
    //   .reOrderWidget(pageId, start, end)
    //   .then(function(widgets) {
    //     res.json(widgets);
    //   });
  }

};
