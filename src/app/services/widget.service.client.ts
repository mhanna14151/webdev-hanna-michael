import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class WidgetService {

  constructor() {
  }

  widgets = [
    { '_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'GIZMODO'},
    { '_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    { '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',
      'url': 'http://lorempixel.com/400/200/'},
    { '_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
    { '_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    { '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',
      'url': 'https://youtu.be/AM2Ivdi9c4E' },
    { '_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
  ];

  api = {
    'createWidget': this.createWidget,
    'findWidgetsByPageId': this.findWidgetsByPageId,
    'findWidgetById': this.findWidgetById,
    'updateWidget': this.updateWidget,
    'deleteWidget': this.deleteWidget
  };


  // Adds the widget parameter instance to the local widgets array.
  // The new widget's pageId is set to the pageId parameter
  createWidget(pageId, widget) {
    widget.pageId = pageId;
    this.widgets.push(widget);
    return widget;
  }

  // Retrieves the widgets in local widgets array whose pageId matches the parameter pageId
  findWidgetsByPageId(pageId) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId === pageId) {
        return this.pages[x];
      }
    }
  }

  // Retrieves the widget in local widgets array whose _id matches the widgetId parameter
  findWidgetById(widgetId) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        return this.widgets[x];
      }
    }
  }

  // Updates the widget in local widgets array whose _id matches the widgetId parameter
  updateWidget(widgetId, widget) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        this.widgets[x] = widget;
      }
    }
  }

  // Removes the widget from local widgets array whose _id matches the widgetId parameter
  deleteWidget(widgetId) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        delete this.widgets[x];
      }
    }
  }

}
