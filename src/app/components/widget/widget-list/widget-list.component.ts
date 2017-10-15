import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {DomSanitizer} from '@angular/platform-browser';

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
  width: String;

  constructor(private widgetService: WidgetService,
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
  }

  outputWidgetsForThisPage() {
    return this.widgetService.findWidgetsByPageId(this.pageID);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.userId]);
  }



  navigateToWidget(ID) {
    this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget',
    ID]);

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

  returnToPreviousSite() {
    this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page']);
  }

}
