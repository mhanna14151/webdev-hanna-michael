import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  userId: String;
  user: User;
  websiteId: String;
  page: Page;
  pages: Page[];
  pageID: String;
  name: String;
  description: String;

  constructor(private userService: UserService,
              private pageService: PageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageID = params['pid'];
      this.page = this.pageService.findPageById(this.pageID);
      this.name = this.page.name;
      this.description = this.page.description;
    });
    this.pages = this.pageService.findPagesByWebsiteId(this.websiteId);
    this.page = this.pageService.findPageById(this.pageID);
    this.name = this.page.name;
    this.description = this.page.description;
    this.userService.findUserById(this.userId)
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  outputPagesForThisUser() {
    const pageList: Page[] = this.pageService.findPagesByWebsiteId(this.websiteId);
    return pageList;
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }

  navigateToWidget(ID) {
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page', ID, 'widget']);

  }

  returnToPreviousPage() {
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page']);
  }

  navigateToCreateNewPage() {
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page', 'new']);
  }

  navigateToPageEdit(ID) {
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page', ID]);
  }

  deleteThisPage(ID) {
    this.pageService.deletePage(ID);
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page']);
  }

  updatePage(ID, name: String, description: String) {
    this.pageService.updatePage(ID, new Page(ID, name, this.userId, description));
    this.router.navigate(['user/', this.user._id, 'website', this.websiteId, 'page']);
  }

}
