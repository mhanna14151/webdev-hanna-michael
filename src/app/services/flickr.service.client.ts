import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Page} from '../models/page.model.client';

// injecting service into module
@Injectable()

export class FlickrService {

  constructor(private _http: Http) {
  }

  baseUrl = environment.baseUrl;

  api = {
    'searchPhotos': this.searchPhotos,
  };


  key = 'd0a01a2fd657981df55f2a258fc456f0';
  secret = '952f4977a645c896';
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';


  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this._http.get(url);
  }

}

