import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: String;
  user: User;
  username: String;
  email: String;
  firstName: String;
  lastName: String;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      console.log('User ID: ' + this.userId);
      this.user = this.userService.findUserById(this.userId);
      console.log('User ' + this.user);
      this.username = this.user.username;
      console.log('username :' + this.username);
      this.email = this.user.email;
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
    });
  }

  navigateToUsersWebsite() {
    this.router.navigate(['user', this.userId, 'website']);
  }

  updateProfile(username: String, email: String, firstName: String, lastName: String) {
    this.userService.updateUser(this.userId, new User(this.userId, username,
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
