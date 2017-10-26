import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  name: String;
  text: String;
  size: Number;
  widget: Widget;
  widgetID: String;
  pageID: String;
  userID: String;
  websiteID: String;
  widgetType: String;

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
    });
    this.widgetService.findWidgetById(this.widgetID)
      .subscribe((widget) => {
        this.widget = widget;
        this.widgetType = this.widget.widgetType;
        this.text = this.widget.text;
        this.size = this.widget.size;
      });
  }

  updateWidgetHeader(text: String, size: Number) {
    const updatedWidget = new Widget(this.widgetID, 'HEADING', this.pageID, size, null, text, null);
    this.widgetService.updateWidget(this.widgetID, updatedWidget)
      .subscribe((widget) => {
      this.widget = widget;
        this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);

      });
  }

  returnToPreviousSite() {
    this.widgetID = this.widget._id;
    if (this.text === null) {
      this.widgetService.deleteWidget(this.widgetID);
    }
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.userID]);
  }

  deleteThisWidget(ID) {
    this.widgetService.deleteWidget(this.widgetID)
      .subscribe(() => {
      // this.widgets = widgets;
        this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);
      });
  }

}
