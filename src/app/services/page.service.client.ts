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
    const url = 'http://localhost:3100/api/website/' + websiteId + '/page';
    return this._http.post(url, page)
      .map((response: Response) => {
      return response.json();
    });
  }

  // Retrieves the pages in local pages array whose websiteId matches the parameter websiteId
  findPagesByWebsiteId(websiteId) {
    const url = 'http://localhost:3100/api/website/' + websiteId + '/page';
    return this._http.get(url)
      .map((response: Response) => {
      return response.json();
    });
  }

  // Retrieves the page in local pages array whose _id matches the pageId parameter
  findPageById(pageId) {
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this._http.get(url)
      .map((response: Response) => {
      return response.json();
    });
  }

  // Updates the page in local pages array whose _id matches the pageId parameter
  updatePage(pageId, page) {
    const url = 'http://localhost:3100/api/page/' + pageId;
    const newPage = new Page(pageId, page.name, page.websiteId, page.description);
    return this._http.put(url, newPage)
      .map((response: Response) => {
        return response.json();
      });
    }

  // Removes the page from local pages array whose _id matches the pageId parameter
  deletePage(pageId) {
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this._http.delete(url)
      .map((response: Response) => {
      return response.json();
    });
  }
}
