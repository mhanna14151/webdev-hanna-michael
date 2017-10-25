import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  userId: String;
  user: User;
  name: String;
  description: String;
  website: Website;
  websiteId: String;
  websites: Website[];

  constructor(
              private websiteService: WebsiteService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
    });
    console.log('the websiteId is this: ' + this.websiteId);
      this.websiteService.findWebsiteById(this.websiteId)
        .subscribe((website: Website) => {
        console.log('before');
        this.website = website;
        console.log('after');
        console.log('website from NgInit: ' + website);
        this.name = this.website.name;
        this.description = this.website.description;
      });
      this.websiteService.findAllWebsitesForUser(this.userId)
          .subscribe((websites: Website[]) => {
            this.websites = websites;
      });
  }

  outputWebsitesForThisUser() {
    return this.websites;
    // const websiteList: Website[] = this.websiteService.findAllWebsitesForUser(this.userId);
    // return websiteList;
  }

  navigateToWebsiteEdit(ID) {
    this.router.navigate(['user/', this.user._id, 'website', ID]);
  }

  updateWebsite(ID, name: String, description: String) {
    this.websiteService.updateWebsite(ID, new Website(ID, name, this.userId, description));
    this.router.navigate(['user/', this.userId, 'website']);
  }

  navigateToUsersWebsite() {
    this.router.navigate(['user', this.userId, 'website']);
  }

  navigateToWebsiteNew() {
    this.router.navigate(['user/', this.user._id, 'website', 'new']);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }

  navigateToPage(ID) {
    this.router.navigate(['user/', this.user._id, 'website', ID, 'page']);

  }

  deleteThisWebsite(webID) {
    this.websiteService.deleteWebsite(webID);
    this.router.navigate(['user', this.userId, 'website']);
  }

}
