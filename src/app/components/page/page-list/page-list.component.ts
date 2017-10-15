import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})

export class PageListComponent implements OnInit {
  userId: String;
  user: User;
  websiteId: String;
  pages: Page[];
  pageID: String;

  constructor(private userService: UserService,
              private pageService: PageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
    });
    this.pages = this.pageService.findPagesByWebsiteId(this.websiteId);
    this.user = this.userService.findUserById(this.userId);

  }

  outputPagesForThisUser() {
    const pageList = this.pageService.findPagesByWebsiteId(this.websiteId);
    return pageList;
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }


  navigateToWidget(ID) {
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page', ID, 'widget']);
  }

  navigateToUsersWebsite() {
    this.router.navigate(['user', this.userId, 'website']);
  }

  navigateToCreateNewPage() {
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page', 'new']);
  }

  navigateToPageEdit(ID) {
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page', ID]);
  }

}
