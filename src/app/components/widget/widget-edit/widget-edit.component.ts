import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {Page} from '../../../models/page.model.client';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  userId: String;
  user: User;
  websiteId: String;
  website: Website;
  pageID: String;
  widgets: Widget[];
  widgetID: String;
  widgetType: String;
  url: string;


  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
      this.widgetID = params['wgid']
    });
    this.widgetType = this.widgetService.findWidgetById(this.widgetID).widgetType
    this.widgets = this.widgetService.findWidgetsByPageId(this.pageID);
    console.log(this.userId);
    console.log('Website Id: ' + this.websiteId);
    console.log('WIDGETS ARE THESE WIDGETS: ' + this.widgets);
    console.log('Page Id: ' + this.pageID);
    // this.website = this.websiteService.findWebsiteById(this.websiteId);
    // this.user = this.userService.findUserById(this.userId);
  }

  outputWidgetsForThisPage() {
    return this.widgetService.findWidgetsByPageId(this.pageID);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }



  navigateToWidget(ID) {
    this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget',
      ID]);

  }

  dyanamicWidth(width) {
    return width.toString;

  }

  navigateToWidgetChooser() {
    this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget', 'new']);
  }

}
