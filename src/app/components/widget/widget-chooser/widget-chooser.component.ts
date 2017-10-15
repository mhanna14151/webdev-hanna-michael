import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model.client";
import {Website} from "../../../models/website.model.client";
import {Page} from "../../../models/page.model.client";
import {Widget} from "../../../models/widget.model.client";
import {UserService} from "../../../services/user.service.client";
import {WebsiteService} from "../../../services/website.service.client";
import {PageService} from "../../../services/page.service.client";
import {WidgetService} from "../../../services/widget.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  userId: String;
  user: User;
  websiteId: String;
  website: Website;
  widgetType: String;
  pages: Page[];
  widget: Widget;
  pageID: String;
  widgets: Widget[];
  widgetID: String;
  url: string;


  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private pageService: PageService,
              private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitzer: DomSanitizer) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
    });
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }

// (_id, widgetType, pageId, size, width, text, url) {
  createNewWidget(type: String) {
    this.widgetType = type;
    // const newWidget: Widget = new Widget(null, this.widgetType, this.pageID, null, null, null, null);
    this.widget = this.widgetService.createWidget(this.pageID,
      new Widget(null, this.widgetType, this.pageID, null, null, null, null));
    console.log('ID' + this.widget._id);
    this.widgetID = this.widget._id;
    console.log('id: ' + this.widgetID);
    this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget',
    this.widgetID]);
  }

  dyanamicWidth(width) {
    return width.toString;

  }

  navigateToWidgetChooser() {
    this.router.navigate(['WidgetChooserComponent']);
  }

  cleanThisUrl(url) {
    let thisUrl = 'https://www.youtube.com/embed/';
    const end = url.split('/');
    thisUrl += end[end.length - 1];
    return this.sanitzer.bypassSecurityTrustResourceUrl(thisUrl);
  }

}
