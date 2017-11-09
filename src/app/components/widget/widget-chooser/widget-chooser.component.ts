import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {Page} from '../../../models/page.model.client';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';


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
  widgetID: String;
  url: string;


  constructor(
              private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
    });
  }

  returnToProfile() {
    this.router.navigate(['user/', this.userId]);
  }

  createNewWidget(type: String) {
    this.widgetType = type;
    const newWidget = new Widget(null, this.widgetType, this.pageID, null, null, null, null);
    this.widgetService.createWidget(this.pageID, newWidget)
      .subscribe((widgets) => {
      console.log('widgets', widgets);
      if (widgets.length === 0)  {
        console.log(this.widget);
        this.widget = widgets[widgets.length];
        console.log(this.widget);
        this.widgetID = this.widget._id;
        this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget',
          this.widgetID]);
      } else {
        this.widget = widgets[widgets.length - 1];
        this.widgetID = this.widget._id;
        this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget',
          this.widgetID]);
      }
    });
  }

  returnToPreviousSite() {
    this.router.navigate(['user/', this.userId, 'website', this.websiteId, 'page', this.pageID, 'widget']);
  }

}
