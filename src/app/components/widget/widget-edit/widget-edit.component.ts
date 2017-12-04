import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  userId: String;
  user: any;
  websiteId: String;
  website: Website;
  pageID: String;
  widget: Widget;
  widgets: Widget[];
  widgetID: String;
  widgetType: String;
  url: string;


  constructor(private sharedService: SharedService,
              private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
      this.widgetID = params['wgid'];
    });
    this.widgetService.findWidgetById(this.widgetID)
      .subscribe((widget) => {
      this.widget = widget;
      this.widgetType = this.widget.widgetType;
      // could put others here?
      });
    this.widgetService.findWidgetsByPageId(this.pageID)
      .subscribe((widgets) => {
      this.widgets = widgets;
      });
  }


  returnToProfile() {
    this.router.navigate(['user/']);
  }




}
