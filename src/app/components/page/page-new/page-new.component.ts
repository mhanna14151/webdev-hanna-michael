import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  userId: String;
  user: any;
  websiteId: String;
  page: Page;
  pages: Page[];
  pageID: String;
  name: String;
  description: String;

  constructor(private userService: UserService,
              private pageService: PageService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.route.params.subscribe(params => {
        this.websiteId = params['wid'];
        this.pageID = params['pid'];
        this.pageService.findPageById(this.pageID)
          .subscribe((page) => {
          this.page = page;
        });
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

  returnToPreviousPage() {
    this.router.navigate(['user/', 'website', this.websiteId, 'page']);
  }

  navigateToCreateNewPage() {
    this.ngOnInit();
  }

  navigateToPageEdit(ID) {
    this.router.navigate(['user/', 'website', this.websiteId, 'page', ID]);
  }

  createNewPage(name, description) {
    const newPage: Page = new Page(null, name, this.websiteId, description);
    this.pageService.createPage(this.websiteId, newPage)
      .subscribe((page) => {
      this.page = page;
      this.router.navigate(['user/', 'website', this.websiteId, 'page']);
      });
  }

}
