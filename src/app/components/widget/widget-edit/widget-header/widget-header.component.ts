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
    this.widget = this.widgetService.findWidgetById(this.widgetID);
    this.text = this.widget.text;
    this.size = this.widget.size;
  }

  updateWidgetHeader(text: String, size: Number) {
    this.widgetService.updateWidget(this.widgetID,
      new Widget(this.widgetID, 'HEADING', this.pageID, size, null, text, null));
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);

  }

  returnToPreviousSite() {
    this.widgetID = this.widget._id;
    if (this.text === null) {
      this.widgetService.deleteWidget(this.widgetID);
    }
    console.log('Deleting from Chevron');
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.userID]);
  }

  deleteThisWidget(ID) {
    this.widgetService.deleteWidget(ID);
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);
  }

  navigateToWidgetChooser() {
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget', 'new']);
  }

  createNewWidget(type: String) {
    this.widgetService.deleteWidget(this.widgetID);
    this.widgetType = type;
    this.widget = this.widgetService.createWidget(this.pageID,
      new Widget(null, this.widgetType, this.pageID, null, null, null, null));
    console.log('ID' + this.widget._id);
    this.widgetID = this.widget._id;
    console.log('id: ' + this.widgetID);
    this.widgetService.deleteWidget(this.widgetID);
    // console.log('Deleting from Create');
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);
    this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget',
      this.widgetID]);
  }


}
