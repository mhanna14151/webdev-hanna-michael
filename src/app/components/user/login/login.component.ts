import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg: String;

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { }

  login(username: String, password: String) {
    this.userService
      .login(this.username, this.password)
      .subscribe((user) => {
      this.sharedService.user = user;
      this.router.navigate(['/user']);
      });
  }
  //   this.userService.findUserByCredentials(username, password)
  //     .subscribe((user: User)  => {
  //       if (user) {
  //         this.router.navigate(['user/', user._id]);
  //       } else {
  //         this.errorFlag = true;
  //         this.errorMsg = 'Username and/or password is incorrect';
  //       }
  //   });
  // }

  ngOnInit() {
  }

}
