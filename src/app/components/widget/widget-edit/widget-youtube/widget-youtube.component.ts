import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  name: String;
  text: String;
  size: Number;
  widget: Widget;
  widgetID: String;
  pageID: String;
  userID: String;
  websiteID: String;
  url: String;
  width: String;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageID = params['pid'];
      this.widgetID = params['wgid'];
      this.userID = params['uid'];
      this.websiteID = params['wid'];
      this.widget = this.widgetService.findWidgetById(this.widgetID);
      this.size = this.widget.size;
      this.url = this.widget.url;
      this.text = this.widget.text;
      this.width = this.widget.width;
      console.log(this.width);
    });
  }
  // _id, widgetType, pageId, size, width, text, url
  updateWidgetYoutube(text: String, width: String, url: String) {
    this.widgetService.updateWidget(this.widgetID,
      new Widget(this.widgetID, 'YOUTUBE', this.pageID, null, width, text, url));
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);

  }

  returnToPreviousSite() {
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.userID]);
  }

  deleteThisWidget(ID) {
    this.widgetService.deleteWidget(ID);
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);
  }

  navigateToWidgetChooser() {
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget', 'new']);
  }


}
