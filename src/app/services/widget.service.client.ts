import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Widget} from '../models/widget.model.client';


// injecting service into module
@Injectable()

export class WidgetService {
  constructor(private _http: Http) {
  }

  baseUrl = environment.baseUrl;

  api = {
    'createWidget': this.createWidget,
    'findWidgetsByPageId': this.findWidgetsByPageId,
    'findWidgetById': this.findWidgetById,
    'updateWidget': this.updateWidget,
    'deleteWidget': this.deleteWidget,
    'reorderWidget': this.reorderWidget
  };


  // Adds the widget parameter instance to the local widgets array.
  // The new widget's pageId is set to the pageId parameter
  createWidget(pageId, widget) {
    // widget._id = Math.random().toString();
    widget.pageId = pageId;
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this._http.post(url, widget)
      .map((response: Response) => {
      return response.json();
      });
  }

  findPagesByWebsiteId(websiteId) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  // Retrieves the widgets in local widgets array whose pageId matches the parameter pageId
  findWidgetsByPageId(ID) {
    const url = this.baseUrl + '/api/page/' + ID + '/widget';
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  // Retrieves the widget in local widgets array whose _id matches the widgetId parameter
  findWidgetById(widgetId) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  // Updates the widget in local widgets array whose _id matches the widgetId parameter
  updateWidget(widgetId, widget) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    const newWidget = new Widget(widgetId, widget.widgetType, widget.pageId, widget.size, widget.width,
      widget.text, widget.url);
    return this._http.put(url, newWidget)
      .map((response: Response) => {
        return response.json();
      });
  }

  // Removes the widget from local widgets array whose _id matches the widgetId parameter
  deleteWidget(widgetId) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this._http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  reorderWidget(pageId, start, stop) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget?initial=' + start + '&final=' + stop;
    const array = {pageId: pageId, start: start, stop: stop};
    return this._http.put(url, array)
      .map((response: Response) => {
        console.log(response.json());
        return response.json();
      });
    // PUT /page/:pageId/widget?initial=index1&final=index2
  }

}
