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
  // websites: Website[];

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private pageService: PageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
      console.log('User id is this: ' +  this.userId);
    });
    this.pages = this.pageService.findPagesByWebsiteId(this.websiteId);
    console.log(this.pages);
    console.log(this.userId);
    console.log('Website Id: ' + this.websiteId);
    this.user = this.userService.findUserById(this.userId);
    // this.route.params.subscribe(params => {
    //     this.websiteId = params['wid'];
    //     console.log('Website ID is this stuff: ' + this.websiteId);
    // });
  }

  outputPagesForThisUser() {
    const pageList: Page[] = this.pageService.findPagesByWebsiteId(this.websiteId);
    return pageList;
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }

  // navigateToWebsiteEdit(ID) {
  //   this.router.navigate(['user/', this.user._id, 'website', ID]);
  // }
  //
  // navigateToWebsiteNew() {
  //   this.router.navigate(['user/', this.user._id, 'website', 'new']);
  // }

  navigateToWidget(ID) {
    console.log('navigating to widget...');
    console.log(this.userId);
    console.log(this.websiteId);
    console.log(ID);
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page', ID, 'widget']);
    console.log('navigated successfully');

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
