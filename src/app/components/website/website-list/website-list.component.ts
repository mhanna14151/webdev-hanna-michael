import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from "../../../services/shared.service.client";

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})

export class WebsiteListComponent implements OnInit {
  userId: String;
  user: any;
  websiteId: String;
  websites: Website[];

  constructor(
              private websiteService: WebsiteService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    console.log('entering init');
    this.user = this.sharedService.user;
    console.log(this.user);
    this.userId = this.user._id;
    this.websiteService.findAllWebsitesForUser(this.userId)
      .subscribe((websites) => {
        this.websites = websites;
      });
  }

  outputWebsitesForThisUser() {
    return this.websites;
  }

  returnToProfile() {
    this.router.navigate(['user/']);
  }

  navigateToWebsiteEdit(ID) {
    this.router.navigate(['user/', 'website', ID]);
  }

  navigateToWebsiteNew() {
    this.router.navigate(['user/', 'website', 'new']);
  }

  navigateToPage(ID) {
    this.router.navigate(['user/', 'website', ID, 'page']);

  }

}
