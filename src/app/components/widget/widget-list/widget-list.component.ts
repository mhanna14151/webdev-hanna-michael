import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  userId: String;
  user: any;
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
              private sanitzer: DomSanitizer,
              private sharedService: SharedService) { }


  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
    });
    this.widgetService.findWidgetsByPageId(this.pageID)
      .subscribe((widgets) => {
        this.widgets = widgets;
      });
  }

  outputWidgetsForThisPage() {
    return this.widgets;
  }

  returnToProfile() {
    this.router.navigate(['user/']);
  }



  navigateToWidget(ID) {
    this.router.navigate(['user/', 'website', this.websiteId, 'page', this.pageID, 'widget',
    ID]);

  }

  navigateToWidgetChooser() {
    this.router.navigate(['user/', 'website', this.websiteId, 'page', this.pageID, 'widget', 'new']);
  }

  cleanThisUrl(url) {
    let thisUrl = 'https://www.youtube.com/embed/';
    const end = url.split('/');
    thisUrl += end[end.length - 1];
    return this.sanitzer.bypassSecurityTrustResourceUrl(thisUrl);
  }

  returnToPreviousSite() {
    this.router.navigate(['user/', 'website', this.websiteId, 'page']);
  }

  onIndexChange(event) {
    this.widgetService.reorderWidget(this.pageID, event.start, event.stop)
      .subscribe((widgets) => {
        this.widgets = widgets;
      });
  }

}
