
import {Url} from "url";

export class Widget {
  _id: String;
  widgetType: String;
  pageId: String;
  size: Number;
  width: String;
  text: String;
  url: Url;

  constructor(_id, widgetType, pageId, size, width, text, url) {
    if (widgetType === 'HEADING') {
      this._id = _id;
      this.widgetType = widgetType;
      this.pageId = pageId;
      this.size = size;
      this.text = text;
    }
    if (widgetType === 'YOUTUBE') {
      this._id = _id;
      this.widgetType = widgetType;
      this.pageId = pageId;
      this.width = width;
      this.url = url;
    }
    if (widgetType === 'IMAGE') {
      this._id = _id;
      this.widgetType = widgetType;
      this.pageId = pageId;
      this.width = width;
      this.url = url;
    }
    if (widgetType === 'HMTL') {
      this._id = _id;
      this.widgetType = widgetType;
      this.pageId = pageId;
      this.text = text;
    }
  }
}
