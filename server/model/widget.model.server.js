function Widget(_id, widgetType, pageId, size, width, text, url) {
  this._id = _id;
  this.widgetType = widgetType;
  this.pageId = pageId;
  this.size = size;
  this.width = width;
  this.text = text;
  this.url = url;
}
module.exports = Widget;
