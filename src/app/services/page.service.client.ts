import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class PageService {

  constructor() {
  }

  pages = [
    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
  ];

  api = {
    'createPage': this.createPage,
    'findPageByWebsiteId': this.findPageByWebsiteId,
    'findPageById': this.findPageById,
    'updatePage': this.updatePage,
    'deletePage': this.deletePage
  };

  // Adds the page parameter instance to the local pages array.
  // The new page's websiteId is set to the websiteId parameter
  createPage(websiteId, page) {
    page.websiteId = websiteId;
    this.pages.push(page);
    return page;
  }

  // Retrieves the pages in local pages array whose websiteId matches the parameter websiteId
  findPageByWebsiteId(websiteId) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === websiteId) {
        return this.pages[x];
      }
    }
  }

  // Retrieves the page in local pages array whose _id matches the pageId parameter
  findPageById(pageId) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        return this.pages[x];
      }
    }
  }

  // Updates the page in local pages array whose _id matches the pageId parameter
  updatePage(pageId, page) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        this.pages[x] = page;
      }
    }
  }

  // Removes the page from local pages array whose _id matches the pageId parameter
  deletePage(pageId) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        delete this.pages[x];
      }
    }
  }

}
