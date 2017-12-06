import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {environment} from '../../../../../environments/environment';
import {SharedService} from '../../../../services/shared.service.client';


@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  name: String;
  user: any;
  text: String;
  size: Number;
  widget: Widget;
  widgetID: String;
  pageID: String;
  userID: String;
  websiteID: String;
  url: String;
  width: String;
  widgetType: String;

  baseUrl = environment.baseUrl;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private sharedService: SharedService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userID = this.user._id;
    this.route.params.subscribe(params => {
      this.pageID = params['pid'];
      this.widgetID = params['wgid'];
      this.websiteID = params['wid'];
      this.widgetService.findWidgetById(this.widgetID)
        .subscribe((widget) => {
          this.widget = widget;
          this.widgetType = this.widget.widgetType;
          this.size = this.widget.size;
          this.url = this.widget.url;
          this.text = this.widget.text;
          this.width = this.widget.width;
        });
    });
  }

  updateWidgetImage(id, text: String, width: String, url: String) {
    if (text === '') {
      alert('Text cannot be left blank');
    } else {
      const updatedWidget = new Widget(id, 'IMAGE', this.pageID, null, width, text, url);
      this.widgetService.updateWidget(id, updatedWidget)
        .subscribe((widget) => {
          this.widget = widget;
          this.router.navigate(['user/', 'website', this.websiteID, 'page', this.pageID, 'widget']);
        });
    }
  }

  returnToPreviousSite() {
    this.widgetID = this.widget._id;
    if (this.url === null) {
      this.widgetService.deleteWidget(this.widgetID);
    }
    this.router.navigate(['user/', 'website', this.websiteID, 'page', this.pageID, 'widget']);
  }

  returnToProfile() {
    this.router.navigate(['user/']);
  }

  deleteThisWidget(ID) {
    this.widgetService.deleteWidget(this.widgetID)
      .subscribe(() => {
        // this.widgets = widgets;
        this.router.navigate(['user/', 'website', this.websiteID, 'page', this.pageID, 'widget']);
      });
  }

  searchFlickr() {
    this.router.navigate(['user/', 'website', this.websiteID, 'page', this.pageID, 'widget',
      this.widgetID, 'flickr']);

  }




}
