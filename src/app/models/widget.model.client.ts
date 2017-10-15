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
    // if (this.widgetType === 'HEADING') {
    //   // this._id = _id;
    //   // this.widgetType = 'HEADING';
    //   // this.pageId = pageId;
    //   this.size = size;
    //   this.text = text;
    //   this.url = null;
    // }
    // if (this.widgetType === 'YOUTUBE') {
    //   // this._id = _id;
    //   // this.widgetType = widgetType.YOUTUBE;
    //   // this.pageId = pageId;
    //   this.width = width;
    //   this.url = url;
    // }
    // if (this.widgetType === 'IMAGE') {
    //   // this._id = _id;
    //   // this.widgetType = 'IMAGE';
    //   // this.pageId = pageId;
    //   this.width = width;
    //   this.url = url;
    // }
    // if (this.widgetType === 'HTML') {
    //   // this._id = _id;
    //   // this.widgetType = 'HTML';
    //   // this.pageId = pageId;
    //   this.text = text;
    // }
  }
}
