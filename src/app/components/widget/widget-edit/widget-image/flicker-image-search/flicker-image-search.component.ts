import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../../../../../services/flickr.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Widget} from '../../../../../models/widget.model.client';
import {WidgetService} from '../../../../../services/widget.service.client';

@Component({
  selector: 'app-flicker-image-search',
  templateUrl: './flicker-image-search.component.html',
  styleUrls: ['./flicker-image-search.component.css']
})
export class FlickerImageSearchComponent implements OnInit {

  searchText: String;
  userId: String;
  websiteId: String;
  widgetId: String;
  pageID: String;
  text: String;
  width: String;
  photos: {};
  widget: Widget;

  constructor(private widgetService: WidgetService,
              private flickrService: FlickrService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitzer: DomSanitizer) {
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
      this.widgetId = params['wgid'];
    });
    this.widgetService.findWidgetById(this.widgetId)
      .subscribe((widget) => {
        this.widget = widget;
        this.text = this.widget.text;
        this.width = '100%';
      });
  }


  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          console.log(data);
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          console.log(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    const updatedWidget = new Widget(this.widgetId, 'IMAGE', this.pageID, this.widget.size, this.width, this.text, url);
    this.widgetService.updateWidget(this.widgetId, updatedWidget)
      .subscribe((widget1) => {
        this.widget = widget1;
        this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget']);
      });
  }

  returnToPreviousSite() {
    this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget',
    this.widgetId]);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.userId]);
  }

}




