import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Page} from '../models/page.model.client';

// injecting service into module
@Injectable()

export class PageService {

  constructor(private _http: Http) {
  }

  pages: Page[] = [
    new Page('321', 'Post 1', '456', 'Lorem'),
    new Page('432', 'Post 2', '456', 'Lorem'),
    new Page('543', 'Post 3', '456', 'Lorem')
  ];

  api = {
    'createPage': this.createPage,
    'findPageByWebsiteId': this.findPagesByWebsiteId,
    'findPageById': this.findPageById,
    'updatePage': this.updatePage,
    'deletePage': this.deletePage
  };

  // Adds the page parameter instance to the local pages array.
  // The new page's websiteId is set to the websiteId parameter
  createPage(websiteId, page) {
    page._id = Math.random().toString();
    page.websiteId = websiteId;
    this.pages.push(page);
    return page;
  }

  // Retrieves the pages in local pages array whose websiteId matches the parameter websiteId
  findPagesByWebsiteId(websiteId) {
    const pageList: Page[] = [];
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === websiteId) {
        pageList.push(this.pages[x]);
      }
    }
    return pageList;
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
        this.pages.splice(x, 1);      }
    }
  }

}
