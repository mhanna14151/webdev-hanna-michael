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

  websites: Website[] = [
    new Website('123', 'Facebook', '456', 'Lorem'),
    new Website('234', 'Tweeter', '456', 'Lorem'),
    new Website('456', 'Gizmodo', '456', 'Lorem'),
    new Website('890', 'Go', '123', 'Lorem'),
    new Website('567', 'Tic Tac Toe', '123', 'Lorem'),
    new Website('678', 'Checkers', '123', 'Lorem'),
    new Website('789', 'Chess', '234', 'Lorem')
  ];

  api = {
    'createWebsite'   : this.createWebsite,
    'findWebsitesByUser' : this.findWebsitesByUser,
    'findWebsiteById' : this.findWebsiteById,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };

  // adds the website parameter instance to the local websites array.
  // The new website's developerId is set to the userId parameter
  createWebsite(userId, website) {
    website._id = Math.random().toString();
    website.developerId = userId;
    this.websites.push(website);
    return website;
  }

  // retrieves the websites in local websites array whose developerId matches the parameter userId
  findWebsitesByUser(userId) {
    const separateWebsite: Website[] = [];
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x].developerId === userId) {
        separateWebsite.push(this.websites[x]); }
    }
    return separateWebsite;
  }

  // retrieves the website in local websites array whose _id matches the websiteId parameter
  findWebsiteById(websiteId) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        return this.websites[x];
      }
    }
  }

  // updates the website in local websites array whose _id matches the websiteId parameter
  // may have to confirm this works
  updateWebsite(websiteId, website) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        this.websites[x] = website;
      }
    }
  }

  // removes the website from local websites array whose _id matches the websiteId parameter
  deleteWebsite(websiteId) {
    console.log('WEBSITE ID' + websiteId);
    console.log(this.websites);
    for (let x = 0; x < this.websites.length; x++) {
      console.log('This.websites ' + this.websites[x]._id);
      if (this.websites[x]._id === websiteId) {
        this.websites.splice(x, 1);
        console.log('Deleted it');
      }
      console.log(this.websites);
    }
  }

}
