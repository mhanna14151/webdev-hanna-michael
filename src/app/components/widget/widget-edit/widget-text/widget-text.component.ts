import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service.client';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  name: String;
  text: String;
  widget: Widget;
  widgetID: String;
  pageID: String;
  user: any;
  userID: String;
  websiteID: String;
  widgetType: String;
  placeholder: String;
  rows: Number;
  formatted: Boolean;

  constructor(private widgetService: WidgetService,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userID = this.user._id;
    this.route.params.subscribe(params => {
      this.pageID = params['pid'];
      this.widgetID = params['wgid'];
      this.websiteID = params['wid'];
    });
    this.widgetService.findWidgetById(this.widgetID)
      .subscribe((widget) => {
        this.widget = widget;
        this.widgetType = this.widget.widgetType;
        this.rows = this.widget.rows;
        this.placeholder = this.widget.placeholder;
        this.text = this.widget.text;
        this.formatted = this.widget.formatted;
        // this.size = this.widget.size;
      });
  }

  updateWidgetTEXT(rows, placeholder, text, formatted) {
    if (text === '' || text === null) {
      alert('Text cannot be left blank');
    } else {
      const updatedWidget = new Widget(this.widgetID, 'TEXT', this.pageID, null, null, null, null);
      updatedWidget.formatted = formatted;
      console.log('formatted is: ', formatted);
      updatedWidget.rows = rows;
      updatedWidget.placeholder = placeholder;
      updatedWidget.text = text;
      this.widgetService.updateWidget(this.widgetID, updatedWidget)
        .subscribe((widget) => {
          this.widget = widget;
          this.router.navigate(['user/', 'website', this.websiteID, 'page', this.pageID, 'widget']);

        });
    }
  }

  returnToPreviousSite() {
    this.widgetID = this.widget._id;
    if (this.text === null) {
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

}
