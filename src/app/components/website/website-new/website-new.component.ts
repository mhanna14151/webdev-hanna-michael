import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {SharedService} from "../../../services/shared.service.client";

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  userId: String;
  user: any;
  name: String;
  description: String;
  website: Website;
  websiteId: String;
  websites: Website[];

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private pageService: PageService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.name = '';
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.websiteService.findAllWebsitesForUser(this.userId)
          .subscribe((websites: Website[]) => {
            this.websites = websites;
          });
      });
  }

  createNewWebsite(name, description) {
    if (name === '' || name === null) {
      alert('Website Name cannot be empty, please try again');
    } else {
      const newWebsite: Website = new Website(null, name, this.userId, description);
      this.websiteService.createWebsite(this.userId, newWebsite)
        .subscribe((websites) => {
          this.websites = websites;
          this.router.navigate(['user/', 'website']);
        });
    }
  }

  outputWebsitesForThisUser() {
    return this.websites;
  }

  navigateToWebsiteEdit(ID) {
    this.router.navigate(['user/', 'website', ID]);
  }


  navigateToUsersWebsite() {
    this.router.navigate(['user', 'website']);
  }

  navigateToWebsiteNew() {
    this.router.navigate(['user/', 'website', 'new']);
  }

  returnToProfile() {
    this.router.navigate(['user']);
  }

  navigateToPage(ID) {
    this.router.navigate(['user/', 'website', ID, 'page']);

  }

}
