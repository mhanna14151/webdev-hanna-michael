import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})

export class WebsiteListComponent implements OnInit {
  userId: String;
  user: User;
  websiteId: String;
  websites: Website[];

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
    });
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    this.user = this.userService.findUserById(this.userId);
    this.websiteId = this.websiteService.findWebsiteById(this.userId)._id;
  }

  outputWebsitesForThisUser() {
    const websiteList: Website[] = this.websiteService.findWebsitesByUser(this.userId);
    return websiteList;
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }

  navigateToWebsiteEdit(ID) {
    this.router.navigate(['user/', this.userId, 'website', ID]);
  }

  navigateToWebsiteNew() {
    this.router.navigate(['user/', this.user._id, 'website', 'new']);
  }

  navigateToPage(ID) {
    this.router.navigate(['user/', this.user._id, 'website', ID, 'page']);

  }

}
