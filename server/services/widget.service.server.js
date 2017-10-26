var Widget = require('../model/widget.model.server');

module.exports = function(app) {

  var multer = require('multer');
  var upload = multer({ dest:__dirname + '/../../dist/assets/uploads'});

  var widgets = [
    new Widget("123", "HEADING", "321", 2, null, "Gizmodo", null),
    new Widget("234", "HEADING", "321", 4, null, "Lorem ipsum", null),
    new Widget("345", "IMAGE", "321", 2, "100%", "Random Image", "http://lorempixel.com/400/200/"),
    new Widget("456", "HTML", "321", null, null, "Lorem ipsum", null), // come back and put the paragraph <p> tags on
    new Widget("567", "HEADING", "321", 4, null, "Lorem Ipsum", null),
    new Widget("678", "YOUTUBE", "321", null, "100%", null, "https://youtu.be/AM2Ivdi9c4E"),
    new Widget("789", "HTML", "321", null, null, "Lorem Ipsum", null) // come back and put the paragraph <p> tags on
  ];

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
    var usersWidgets = [];
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i].pageId === pageId) {
        usersWidgets.push(widgets[i]);
      }
    }
    res.json(usersWidgets);
  }

  function findWidgetById(req, res) {
    var widgetId = req.params["wgid"];
    var widget = widgets.find(function (widget) {
      "use strict";
      return widget._id === widgetId
    });
    res.json(widget);
  }

  function updateWidget(req, res) {
    var widgetId = req.params['wgid'];
    var newWidget = req.body;
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        widgets[i] = newWidget;
        res.json(widgets);
        return;
      }
    }
  }


  function deleteWidget(req, res) {
    var widgetId = req.params['wgid'];
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        widgets.splice(i, 1);
        res.json(widgets);
        return;
      }
    }
  }

  function createWidget(req, res) {
    const widget = req.body;
    var newWidget = new Widget(widget._id, widget.widgetType, widget.pageId, widget.size, widget.width, widget.text,
      widget.url);
    widgets.push(newWidget);
    res.json(newWidget);
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

    widget = getWidgetById(widgetId);
    widget.url = '/assets/uploads/'+filename;

    var callbackUrl   = "/user/"+userId+"/website/"+websiteId+ '/page/' + pageId + '/widget';
    res.redirect(callbackUrl);

  }

  /**
   * Helper Function to find the widget
   * @param widgetId
   * @returns widget
   */
  function getWidgetById(widgetId) {
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        return widgets[i];
      }
    }
  }

};
