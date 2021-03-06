import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  userId: String;
  user: any;
  websiteId: String;
  page: Page;
  pages: Page[];
  pageID: String;
  name: String;
  description: String;

  constructor(private sharedService: SharedService,
              private userService: UserService,
              private pageService: PageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
      this.pageService.findPageById(this.pageID)
        .subscribe((page) => {
          this.page = page;
          this.name = this.page.name;
          this.description = this.page.description;
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
    this.router.navigate(['user/', 'website', this.websiteId, 'page', 'new']);
  }

  navigateToPageEdit(ID) {
    this.router.navigate(['user/', 'website', this.websiteId, 'page', ID]);
  }

  deleteThisPage(ID) {
    this.pageService.deletePage(this.pageID)
      .subscribe((pages) => {
        this.pages = pages;
        this.router.navigate(['user/', 'website', this.websiteId, 'page']);
      });
  }

  updatePage(ID, name: String, description: String) {
    if (name === '' || name === null) {
      alert('Name cannot be left blank');
    } else {
    const updatedPage = new Page(ID, name, this.websiteId, description);
    this.pageService.updatePage(this.pageID, updatedPage)
      .subscribe((page) => {
        this.page = page;
        this.router.navigate(['user/', 'website', this.websiteId, 'page']);
      });
    }
  }
}
