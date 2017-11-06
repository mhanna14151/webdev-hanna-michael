import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Website} from '../models/website.model.client';

// injecting service into module
@Injectable()
export class WebsiteService {

  constructor(private _http: Http) { }

  baseUrl = environment.baseUrl;

  api = {
    'createWebsite'   : this.createWebsite,
    'findAllWebsitesForUser' : this.findAllWebsitesForUser,
    'findWebsiteById' : this.findWebsiteById,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };

  // adds the website parameter instance to the local websites array.
  // The new website's developerId is set to the userId parameter
  createWebsite(userId, website) {
    // website._id = Math.random().toString();
    // website.developerId = userId;
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this._http.post(url, website)
      .map((response: Response) => {
        return response.json();
      });
  }

  // retrieves the websites in local websites array whose developerId matches the parameter userId
  findAllWebsitesForUser(userId) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  // retrieves the website in local websites array whose _id matches the websiteId parameter
  findWebsiteById(websiteId) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this._http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        });
  }

  // updates the website in local websites array whose _id matches the websiteId parameter
  // may have to confirm this works
  updateWebsite(websiteId, website) {
    const newWebsite = new Website(websiteId, website.name, website.developerId, website.description);
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this._http.put(url, newWebsite)
      .map((response: Response) => {
        return response.json();
      });
  }

  // removes the website from local websites array whose _id matches the websiteId parameter
  deleteWebsite(websiteId) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this._http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

}
