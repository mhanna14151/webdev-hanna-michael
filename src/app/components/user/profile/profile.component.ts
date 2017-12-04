import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: String;
  user: any;
  users: User[];
  username: String;
  email: String;
  firstName: String;
  lastName: String;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
     this.route.params
      .subscribe(params => {
        this.user = this.sharedService.user;
        // if (this.user !== {}) {
        this.userId = this.user._id;
          this.username = this.user.username;
          this.email = this.user.email;
          this.firstName = this.user.firstName;
          this.lastName = this.user.lastName;
        // }
      });
  }

  navigateToUsersWebsite() {
    this.router.navigate(['user', this.userId, 'website']);
  }

  updateProfile(username: String, email: String, firstName: String, lastName: String) {
    confirm('Are you sure you wish to update your information?');
    if (this.user.username !== username) {
      this.userService.findUserByUsername(username).subscribe((theUser) => {
        if (theUser) {
          alert('Username is already taken');
          this.user.username = this.user.username;
          this.user.email = email;
          this.user.firstName = firstName;
          this.user.lastName = lastName;    this.userService.updateUser(this.userId, this.user)
            .subscribe((users) => {
              this.users = users;
            });

        } else {
          this.user.username = username;
          this.user.email = email;
          this.user.firstName = firstName;
          this.user.lastName = lastName;
          this.userService.updateUser(this.userId, this.user)
            .subscribe((users) => {
              this.users = users;
            });
        }
      });
    } else {
      this.user.username = username;
      this.user.email = email;
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.userService.updateUser(this.userId, this.user)
        .subscribe((users) => {
          this.users = users;
        });
    }
    // const newUser = new User(this.userId, username, this.user.password, email, firstName, lastName);
  }

  terminateAccount() {
    const exterminate = window.confirm('Are you sure you wish for your account to be EXTERMINATED????');
    if (exterminate === true) {
      this.userService.deleteUser(this.userId)
        .subscribe((users) => {
          this.users = users;
          this.router.navigate(['exterminate']);
        });
    } else {
      // do nothing.
    }
  }

  returnToProfile() {
    this.ngOnInit();
  }

  logout() {
    this.userService.logout()
      .subscribe((status) => {
        this.router.navigate(['/login']);
      });
  }

}
