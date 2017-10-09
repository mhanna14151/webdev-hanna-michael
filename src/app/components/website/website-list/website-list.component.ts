import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  userId: String;
  user: any;

  constructor(private userService: UserService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {    this.route.params.subscribe(params => {
    this.userId = params['uid'];
    this.user = this.userService.findUserById(this.userId);
  });
  }
  returnToProfile() {
    this.router.navigate(['user/', this.user._id]);
  }
}
