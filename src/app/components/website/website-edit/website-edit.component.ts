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
      this.websiteService.findWebsiteById(this.websiteId)
        .subscribe((website: Website) => {
          this.website = website;
          console.log('website from NgInit: ' + website);
          this.name = this.website.name;
          this.description = this.website.description;
        });
    });
    this.websiteService.findAllWebsitesForUser(this.userId)
      .subscribe((websites: Website[]) => {
        this.websites = websites;
      });
  }

  outputWebsitesForThisUser() {
    return this.websites;
  }

  navigateToWebsiteEdit(ID) {
    this.router.navigate(['user/', this.userId, 'website', ID]);
  }

  updateWebsite(ID, name: String, description: String) {
    const updatedWebsite = new Website(ID, name, this.userId, description);
    this.websiteService.updateWebsite(this.websiteId, updatedWebsite)
      .subscribe((website) => {
      this.website = website;
      this.name = this.website.name;
      });
    this.router.navigate(['user/', this.userId, 'website']);
  }

  navigateToUsersWebsite() {
    this.router.navigate(['user', this.userId, 'website']);
  }

  navigateToWebsiteNew() {
    this.router.navigate(['user/', this.userId, 'website', 'new']);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.userId]);
  }

  navigateToPage(ID) {
    this.router.navigate(['user/', this.userId, 'website', ID, 'page']);

  }

  deleteThisWebsite(webID) {
    this.websiteService.deleteWebsite(this.websiteId)
      .subscribe((websites) => {
        this.websites = websites;
        this.router.navigate(['user', this.userId, 'website']);
      });
  }

}
