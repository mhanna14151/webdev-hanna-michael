import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
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

  // websites: Website[];

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private pageService: PageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid']
      this.website = this.websiteService.findWebsiteById(this.websiteId);
      this.user = this.userService.findUserById(this.userId);
      this.name = this.website.name;
      this.description = this.website.description;
    });
  }

  outputWebsitesForThisUser() {
    const websiteList: Website[] = this.websiteService.findWebsitesByUser(this.userId);
    // console.log(this.websiteService.findWebsitesByUser(this.userId));
    return websiteList;
  }

  navigateToWebsiteEdit(ID) {
    this.router.navigate(['user/', this.user._id, 'website', ID]);
  }

  updateWebsite(ID, name: String, description: String) {
    this.websiteService.updateWebsite(ID, new Website(ID, name, this.userId, description));
  }

  navigateToUsersWebsite() {
    this.router.navigate(['user', this.userId, 'website']);
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }
}
