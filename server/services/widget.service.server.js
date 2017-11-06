var Widget = require('../model/widget.model.server');

module.exports = function(app) {

  var widgetModel = require("../../models/widget/widget.model.server");


  var multer = require('multer');
  var upload = multer({ dest:__dirname + '/../../dist/assets/uploads'});

  // var widgets = [
  //   new Widget("123", "HEADING", "321", 2, null, "Gizmodo", null),
  //   new Widget("234", "HEADING", "321", 4, null, "Lorem ipsum", null),
  //   new Widget("345", "IMAGE", "321", 2, "100%", "Random Image", "http://lorempixel.com/400/200/"),
  //   new Widget("456", "HTML", "321", null, null, "Lorem ipsum", null), // come back and put the paragraph <p> tags on
  //   new Widget("567", "HEADING", "321", 4, null, "Lorem Ipsum", null),
  //   new Widget("678", "YOUTUBE", "321", null, "100%", null, "https://youtu.be/AM2Ivdi9c4E"),
  //   new Widget("789", "HTML", "321", null, null, "Lorem Ipsum", null) // come back and put the paragraph <p> tags on
  // ];

  app.get("/api/page/:pid/widget", findAllWidgetsForPage);
  app.get("/api/widget/:wgid", findWidgetById);
  app.put("/api/widget/:wgid", updateWidget);
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
    //
    //
    // var widget = widgets.find(function (widget) {
    //   "use strict";
    //   return widget._id === widgetId
    // });
    // res.json(widget);
  }

  function updateWidget(req, res) {
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
        // newWidget.width = widget.width;
        // widget size;
        widgetModel.updateWidget(widgetId, newWidget)
          .then(function(widget1) {
            var callbackUrl   = "/user/"+userId+"/website/"+websiteId+ '/page/' + pageId + '/widget';
            res.redirect(callbackUrl);
          });
      });// res.redirect(callbackUrl);
  }

  // /**
  //  * Helper Function to find the widget
  //  * @param widgetId
  //  * @returns widget
  //  */
  // function getWidgetById(widgetId) {
  //   for (var i = 0; i < widgets.length; i++) {
  //     if (widgets[i]._id === widgetId) {
  //       return widgets[i];
  //     }
  //   }
  // }

};


//
// function uploadImage(req, res) {
//
//
//
//
//
//
//   var widgetId      = req.body.widgetId;
//   var width         = req.body.width;
//   var myFile        = req.file;
//
//   var userId = req.body.userId;
//   var websiteId = req.body.websiteId;
//   var pageId = req.body.pageId;
//
//   var originalname  = myFile.originalname; // file name on user's computer
//   var filename      = myFile.filename;     // new file name in upload folder
//   var path          = myFile.path;         // full path of uploaded file
//   var destination   = myFile.destination;  // folder where file is saved to
//   var size          = myFile.size;
//   var mimetype      = myFile.mimetype;
//
//   widget = getWidgetById(widgetId);
//   widget.url = '/assets/uploads/'+filename;
//
//   var callbackUrl   = "/user/"+userId+"/website/"+websiteId+ '/page/' + pageId + '/widget';
//   res.redirect(callbackUrl);
//
// }
