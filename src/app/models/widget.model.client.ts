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

// (_id, widgetType, pageId, size, width, text, url)
widgets = [
  new Widget('123', 'HEADING', '321', 2, null, 'Gizmodo', null),
  new Widget('234', 'HEADING', '321', 4, null, 'Lorem ipsum', null),
  new Widget('345', 'IMAGE', '321', 2, '100%', null, 'http://lorempixel.com/400/200/'),
  new Widget('456', 'HTML', '321', null, null, '<p>Lorem ipsum</p>'),
  new Widget()

  { '_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
  { '_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
  { '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',
    'url': 'https://youtu.be/AM2Ivdi9c4E' },
  { '_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
];
