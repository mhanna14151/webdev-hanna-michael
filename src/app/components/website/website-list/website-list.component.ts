import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {User} from "../../../models/user.model.client";
import {PageService} from "../../../services/page.service.client";

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})



export class WebsiteListComponent implements OnInit {
  userId: String;
  user: User;
  // websites: Website[];

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private pageService: PageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.userId = params['uid'];
    this.user = this.userService.findUserById(this.userId);
    });
  }

  outputWebsitesForThisUser() {
    const websiteList: Website[] = this.websiteService.findWebsitesByUser(this.userId);
    console.log(this.websiteService.findWebsitesByUser(this.userId));
    return websiteList;
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }

  navigateToPage() {
    // this.router.navigate(this.pageService.findPageBy)


  }
}
