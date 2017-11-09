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
      PageModel
        .findPageById(newWidget.pageId)
        .then(function (page) {
          page.widgets.push(newWidget);
          return page.save();
        });
    });
}

function findAllWidgetsForPage(pageId) {
  // return PageModel.findPageById(pageId);
  return WidgetModel.find({pageId: pageId})
    .populate('pageId')
    .exec();
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
  WidgetModel.findAllWidgetsForPage(pageId)
    .then(function (widgets) {
      theseWidgets = widgets;
      console.log('THESE WIDGETS ', theseWidgets);
      WidgetTemp = theseWidgets[first];
      console.log('Temp Widget ', WidgetTemp);
      theseWidgets.splice(first, 1);
      theseWidgets.splice(last, 0, widgetTemp);
      // theseWidgets[last] = widgetTemp;
      widgets = theseWidgets;
      console.log('widgets are now', widgets);
      return PageModel.findPageById(pageId)
        .then(function(page) {
          var newPage = new Page(pageId, page.name, page.websiteId, page.description);
          console.log('These are the widgets: ', theseWidgets);
          newPage.widgets = theseWidgets;
          console.log('this is the page.', newPage);
          return PageModel.updateOne({_id: pageId}, newPage);
        });
    });
}






// var mongoose = require('mongoose');
// var WidgetSchema = require("./widget.schema.server");
// var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
// var WebsiteModel = require('../website/website.model.server');
// var PageModel = require('../page/page.model.server') ;
//
// WidgetModel.createWidget = createWidget;
// WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
// WidgetModel.findWidgetById = findWidgetById;
// WidgetModel.updateWidget = updateWidget;
// WidgetModel.deleteWidget = deleteWidget;
// WidgetModel.reOrderWidget = reOrderWidget;
//
// module.exports = WidgetModel;
//
// function createWidget(widget) {
//   var newWidget = null;
//   return WidgetModel
//     .create(widget)
//     .then(function (widget) {
//       newWidget = widget;
//       PageModel
//         .findPageById(newWidget.pageId)
//         .then(function (page) {
//           page.widgets.push(newWidget);
//           return page.save();
//         });
//     });
// }
//
// function findAllWidgetsForPage(pageId) {
//   PageModel.find({pageId: pageId})
//     .populate('pageId')
//     .exec();
// }
//
// function findWidgetById(widgetId) {
//   return WidgetModel.findOne({_id: widgetId});
// }
//
// function updateWidget(widgetId, widget) {
//   return WidgetModel.updateOne({_id: widgetId}, widget);
// }
//
//
// function deleteWidget(widgetId) {
//   var widgetThis = WidgetModel.findWidgetById(widgetId)
//     .then(function(widget) {
//       widgetThis = widget;
//       PageModel.findPageById(widgetThis.pageId)
//         .then(function(page) {
//           for (var i = 0; i < page.widgets.length; i++) {
//             if (page.widgets[i]._id = widgetId) {
//               page.widgets.splice(i, 1);
//               page.save();
//             }
//           }
//         });
//     });
//   return WidgetModel.deleteOne({_id: widgetId});
// }
//
// function reOrderWidget(pageId, start, end) {
//   console.log('DID WE EVER GET HERE?!?!?!?!?!?!?!?!?');
//   var widgetTemp = null;
//   var theseWidgets = WidgetModel.findAllWidgetsForPage()
//     .then(function (widgets) {
//       theseWidgets = widgets;
//       if (end < start) {
//         widgetTemp = widget[start];
//         let i = start;
//         while (i > end) {
//           theseWidgets[i] = theseWidgets[i - 1];
//           i--;
//         }
//       } else {
//         widgetTemp = widget[start];
//         let i = start;
//         while (i < end) {
//           theseWidgets[i] = theseWidgets[i + 1];
//           i++;
//         }
//       }
//     });
//   PageModel.findPageById(pageId)
//     .then(function(page) {
//           page.widgets.splice(0, page.widgets.length);
//           page.save();
//     });
//   for (var i = 0; i < theseWidgets.length; i++) {
//     createWidget((theseWidgets[i]));
//   }
// }
//
//
//
//   //     PageModel.findPageById(widgetThis.pageId)
//   //       .then(function(page) {
//   //         for (var i = 0; i < page.widgets.length; i++) {
//   //           if (page.widgets[i]._id = widgetId) {
//   //             page.widgets.splice(i, 1);
//   //             page.save();
//   //           }
//   //         }
//   //       });
//   //   });
//   //
//   //
//   // return null;



/*

 // var first = Number(start);
  // var last = Number(end);
  // console.log('entered the model');
  // return PageModel.findPageById(pageId)
  //   .then(function(page) {
  //   console.log('entered the thing');
  //   // console.log(page.widgets);
  //   var theseWidgets = page.widgets;
  //   console.log('THESE WIDGETS ARE ', theseWidgets);
  //   var widgetTemp = null;
  //   if (last < first) {
  //     console.log('end is less than start');
  //     widgetTemp = theseWidgets[start];
  //     let i = first;
  //     while (i > last) {
  //       page.widgets[i] = theseWidgets[i - 1];
  //       i--;
  //     }
  //     page.widgets[first] = widgetTemp;
  //     console.log('edited the page.widgets');
  //     page.save();
  //     PageModel.updatePage(pageId, page);
  //   } else if (first < last) {
  //     console.log('start is less than end');
  //     // console.log('THESE WIDGETS ARE ', theseWidgets);
  //     var i = first;
  //     var j = i + 1;
  //     console.log('j ', j);
  //     widgetTemp = page.widgets[first];
  //     console.log('TEMP IS: ', widgetTemp);
  //     console.log('i is : ', i);
  //     for (i; i < last; i++) {
  //       console.log('before ', page.widgets[i].text);
  //       console.log('should change into: ', page.widgets[j].text)
  //       page.widgets[i] = page.widgets[j];
  //       console.log('after ', page.widgets[i].text);
  //       j++;
  //     }
  //     console.log('exiting for loop');
  //
  //     //
  //     //
  //     // while (i < end) {
  //     //   console.log('I is ', i);
  //     //   const j = i + 1;
  //     //   console.log('pos ', j);
  //     //   console.log('change the page.widget');
  //     //   // console.log('THE TEMP EXISTS?' , theseWidgets[j].text);
  //     //   console.log('this ', page.widgets[i].text);
  //     //   console.log('is NOW ', theseWidgets[i].text);
  //     //
  //     //   page.widgets[i] = page.widgets[j];
  //     //   console.log('is now');
  //     //   console.log('is now ', page.widgets[i].text);
  //     //   i++;
  //     // }
  //     // console.log('edited the page.widgets');
  //     page.widgets[last] = widgetTemp;
  //     console.log(page.widgets);
  //     page.save();
  //     PageModel.updatePage(pageId, page);


 */
