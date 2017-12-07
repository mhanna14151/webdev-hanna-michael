import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service.client';



@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {
  name: String;
  text: String;
  user: any;
  // size: Number;
  widget: Widget;
  widgetID: String;
  pageID: String;
  userID: String;
  websiteID: String;
  widgetType: String;

  constructor(private sharedService: SharedService,
              private widgetService: WidgetService,
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
        this.text = this.widget.text;
        // this.size = this.widget.size;
      });
  }

  updateWidgetHTML(name: String, text: String) {
    if (name === '' || name === null || text === null || text === '') {
      alert('Fields cannot be left blank');
    } else {
      const updatedWidget = new Widget(this.widgetID, name, this.pageID, null, null, text, null);
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
