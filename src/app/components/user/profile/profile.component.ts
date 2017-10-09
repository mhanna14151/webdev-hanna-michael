import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';
import {User} from "../../../models/user.model.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: String;
  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.user = this.userService.findUserById(this.userId);
    });
  }

  updateProfile(userName, email, firstName, lastName) {
    this.userService.updateUser(this.userId, new User(this.userId, userName,
      this.user.password, email, firstName, lastName));
  }

  // updateProfile() {
  //   this.user(this.user.firstName, this.user.lastName)
  //   this.userService.updateUser(this.userId, this.user);
  // }
  // returnToProfile() {
  //   this.router.navigate(['user/', this.user._id]);
  // }

}
