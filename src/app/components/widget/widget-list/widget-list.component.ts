import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {$PERCENT} from "@angular/compiler/src/chars";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  userId: String;
  user: User;
  websiteId: String;
  website: Website;
  pages: Page[];
  pageID: String;
  widgets: Widget[];
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

  cleanThisUrl(url) {
    let thisUrl = 'https://www.youtube.com/embed/';
    const end = url.split('/');
    thisUrl += end[end.length - 1];
    return this.sanitzer.bypassSecurityTrustResourceUrl(thisUrl);
  }

}
