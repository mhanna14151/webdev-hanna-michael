import {Url} from 'url';

export class Widget {
  _id: String;
  widgetType: String;
  pageId: String;
  size: Number;
  width: String;
  text: String;
  url: string;

  constructor(_id, widgetType, pageId, size, width, text, url) {
    this._id = _id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.width = width;
    this.text = text;
    this.url = url;

  }
}
