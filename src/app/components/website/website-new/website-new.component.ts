import {Component, OnInit, ViewChild} from '@angular/core';
import {Website} from "../../../models/website.model.client";
import {UserService} from "../../../services/user.service.client";
import {WebsiteService} from "../../../services/website.service.client";
import {PageService} from "../../../services/page.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user.model.client";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  // @ViewChild('f') websiteForm: NgForm;
  userId: String;
  user: User;
  name: String;
  description: String;
  website: Website;
  websiteId: String;
  websites: Website[];

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
      this.websiteId = params['wid'];
      this.website = this.websiteService.findWebsiteById(this.websiteId);
      this.user = this.userService.findUserById(this.userId);
      this.name = this.websiteService.findWebsiteById(this.websiteId).name;
      this.description = this.website.description;
      this.websites = this.websiteService.findWebsitesByUser(this.userId);
      console.log('Name' + this.name);

    });
    console.log('Name' + this.name);
    this.websiteId = this.websiteService.findWebsiteById(this.userId)._id;
    // this.name = this.websiteForm.value.name;
    // this.description = this.websiteForm.value.description;
  }

  outputWebsitesForThisUser() {
    const websiteList: Website[] = this.websiteService.findWebsitesByUser(this.userId);
    // console.log(this.websiteService.findWebsitesByUser(this.userId));
    return websiteList;
  }

  navigateToWebsiteEdit(ID) {
    this.router.navigate(['user/', this.user._id, 'website', ID]);
  }

  // updateWebsite(ID, name: String, description: String) {
  //   this.websiteService.updateWebsite(ID, new Website(ID, name, this.userId, description));
  // }

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

  createNewWebsite(name, description) {
    const num: Number = (Math.floor(1 + (1000 - 1) * Math.random()));
    const newWebsite: Website = new Website(num, name, this.userId, description);
    this.websiteService.createWebsite(this.userId, newWebsite);
    this.router.navigate(['user', this.userId, 'website']);
    console.log('NAMME' + name);
    this.name = this.website.name;

  }

}
