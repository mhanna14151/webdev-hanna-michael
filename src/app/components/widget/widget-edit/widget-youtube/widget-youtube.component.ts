import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  user: any;
  name: String;
  text: String;
  size: Number;
  widget: Widget;
  widgetID: String;
  pageID: String;
  userID: String;
  websiteID: String;
  url: String;
  width: String;
  widgetType: String;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userID = this.user._id;
    this.route.params.subscribe(params => {
      this.pageID = params['pid'];
      this.widgetID = params['wgid'];
      this.websiteID = params['wid'];
      this.widgetService.findWidgetById(this.widgetID)
        .subscribe((widget) => {
          this.widget = widget;
          this.size = this.widget.size;
          this.url = this.widget.url;
          this.text = this.widget.text;
          this.width = this.widget.width;
          // could put others here?
        });
    });
  }

  updateWidgetYoutube(text: String, width: String, url: String) {
    const updatedWidget = new Widget(this.widgetID, 'YOUTUBE', this.pageID, null, width, text, url);
    this.widgetService.updateWidget(this.widgetID, updatedWidget)
      .subscribe((widget) => {
        this.widget = widget;
        this.router.navigate(['user/', 'website', this.websiteID, 'page', this.pageID, 'widget']);

      });
  }

  returnToPreviousSite() {
    this.widgetID = this.widget._id;
    if (this.url === null) {
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

  // COMMENTED OUT IN CASE I WANT TO BRING BACK THE DOUBLE COLUMNS WITH THE SIDEBAR
  // navigateToWidgetChooser() {
  //   this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget', 'new']);
  // }
  //
  // createNewWidget(type: String) {
  //   this.widgetType = type;
  //   this.widget = this.widgetService.createWidget(this.pageID,
  //     new Widget(null, this.widgetType, this.pageID, null, null, null, null));
  //   this.widgetID = this.widget._id;
  //   this.widgetService.deleteWidget(this.widgetID);
  //   this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget']);
  //   this.router.navigate(['user/', this.userID, 'website', this.websiteID, 'page', this.pageID, 'widget',
  //     this.widgetID]);
  // }


}
