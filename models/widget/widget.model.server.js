var mongoose = require('mongoose');
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
var WebsiteModel = require('../website/website.model.server');
var PageModel = require('../page/page.model.server') ;

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(widget) {
  console.log('Creating Widget');
  var newWidget = null;
  return WidgetModel
    .create(widget)
    .then(function (widget) {
      newWidget = widget;
      return PageModel
        .findPageById(newWidget.pageId)
        .then(function (page) {
          page.widgets.push(newWidget);
          return page.save();
        });
    });
}

function findAllWidgetsForPage(pageId) {
  return PageModel
    .findPageById(pageId)
    .populate('widgets')
    .exec()
    .then(function (page) {
      return page.widgets;
    });
  // return WidgetModel.find({pageId: pageId})
    // .populate('pageId')
    // .exec();
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  console.log('Updating widget');
  return WidgetModel.updateOne({_id: widgetId}, widget);
}


function deleteWidget(widgetId) {
  var widgetThis = WidgetModel.findWidgetById(widgetId)
    .then(function(widget) {
      widgetThis = widget;
      PageModel.findPageById(widgetThis.pageId)
        .then(function(page) {
          for (var i = 0; i < page.widgets.length; i++) {
            if (page.widgets[i]._id = widgetId) {
              page.widgets.splice(i, 1);
              page.save();
            }
          }
        });
    });
  return WidgetModel.deleteOne({_id: widgetId});
}


function reorderWidget(pageId, start, end) {
  var theseWidgets = null;
  var widgetTemp = null;
  var first = Number(start);
  var last = Number(end);
  start = parseInt(start);
  end = parseInt(end);
  return PageModel
    .findPageById(pageId)
    .then(function (page) {
      page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
      return page.save();
    })
    .then(function(page){
      return page.widgets;
    });
}
