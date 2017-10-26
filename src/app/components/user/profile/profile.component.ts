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
  users: User[];
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
      this.userService.findUserById(this.userId)
        .subscribe((user: User) => {
        this.user = user;
          this.username = this.user.username;
          this.email = this.user.email;
          this.firstName = this.user.firstName;
          this.lastName = this.user.lastName;
      });
    });
  }

  navigateToUsersWebsite() {
    this.router.navigate(['user', this.userId, 'website']);
  }

  updateProfile(username: String, email: String, firstName: String, lastName: String) {
    const newUser = new User(this.userId, username, this.user.password, email, firstName, lastName);
    this.userService.updateUser(this.userId, newUser)
      .subscribe((users) => {
      this.users = users;
    });
  }

  terminateAccount() {
    const exterminate = window.confirm('Are you sure you wish for your account to be EXTERMINATED????');
    if (exterminate === true) {
      this.userService.deleteUser(this.userId)
        .subscribe((users) => {
          this.users = users;
          this.router.navigate(['']);
        });
    } else {
      // do nothing.
    }
  }

  returnToProfile() {
    this.ngOnInit();
  }

}
