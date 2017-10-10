import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {User} from "../../../models/user.model.client";

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
    if (websiteList.length > 0) {
      document.write('<ul class="list-group borderless">');
      for (let i = 0; websiteList.length; i++) {
        console.log(websiteList[i]);
        const name: String = websiteList[i].name;
        document.write('<li class="list-group-item"><name</li>');
      }
      document.write('</ul>');
    }
  }

  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }
}
