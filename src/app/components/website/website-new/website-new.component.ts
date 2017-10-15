import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  userId: String;
  user: User;
  name: String;
  description: String;
  website: Website;
  websiteId: String;

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
    });
  }

  createNewWebsite(name, description) {
    const newWebsite: Website = new Website(null, name, this.userId, description);
    this.websiteService.createWebsite(this.userId, newWebsite);
  }

  outputWebsitesForThisUser() {
    const websiteList: Website[] = this.websiteService.findWebsitesByUser(this.userId);
    return websiteList;
  }

  navigateToWebsiteEdit(ID) {
    this.router.navigate(['user/', this.user._id, 'website', ID]);
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

}
