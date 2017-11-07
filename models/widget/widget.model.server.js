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
WidgetModel.reOrderWidget = reOrderWidget;

module.exports = WidgetModel;

function createWidget(widget) {
  var newWidget = null;
  return WidgetModel
    .create(widget)
    .then(function (widget) {
      newWidget = widget;
      PageModel
        .findPageById(newWidget.pageId)
        .then(function (page) {
          page.widgets.push(newWidget);
          return page.save();
        });
    });
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({pageId: pageId})
    .populate('pageId')
    .exec();
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
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

function reOrderWidget(pageId, start, end) {
  console.log('DID WE EVER GET HERE?!?!?!?!?!?!?!?!?');
  var widgetTemp = null;
  var theseWidgets = WidgetModel.findAllWidgetsForPage()
    .then(function (widgets) {
      theseWidgets = widgets;
      if (end < start) {
        widgetTemp = widget[start];
        let i = start;
        while (i > end) {
          theseWidgets[i] = theseWidgets[i - 1];
          i--;
        }
      } else {
        widgetTemp = widget[start];
        let i = start;
        while (i < end) {
          theseWidgets[i] = theseWidgets[i + 1];
          i++;
        }
      }
    });
  PageModel.findPageById(pageId)
    .then(function(page) {
          page.widgets.splice(0, page.widgets.length);
          page.save();
    });
  for (var i = 0; i < theseWidgets.length; i++) {
    createWidget((theseWidgets[i]));
  }
}



  //     PageModel.findPageById(widgetThis.pageId)
  //       .then(function(page) {
  //         for (var i = 0; i < page.widgets.length; i++) {
  //           if (page.widgets[i]._id = widgetId) {
  //             page.widgets.splice(i, 1);
  //             page.save();
  //           }
  //         }
  //       });
  //   });
  //
  //
  // return null;
