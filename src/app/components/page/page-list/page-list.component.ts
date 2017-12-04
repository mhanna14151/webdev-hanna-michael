import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})

export class PageListComponent implements OnInit {
  userId: String;
  user: any;
  websiteId: String;
  pages: Page[];
  pageID: String;

  constructor(private pageService: PageService,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
      this.pageService.findPagesByWebsiteId(this.websiteId)
        .subscribe((pages) => {
          this.pages = pages;
        });
    });
  }

  outputPagesForThisUser() {
    return this.pages;
  }

  returnToProfile() {
    this.router.navigate(['user/']);
  }


  navigateToWidget(ID) {
    this.router.navigate(['user/', 'website', this.websiteId, 'page', ID, 'widget']);
  }

  navigateToUsersWebsite() {
    this.router.navigate(['user', 'website']);
  }

  navigateToCreateNewPage() {
    this.router.navigate(['user/', 'website', this.websiteId, 'page', 'new']);
  }

  navigateToPageEdit(ID) {
    this.router.navigate(['user/', 'website', this.websiteId, 'page', ID]);
  }

}
