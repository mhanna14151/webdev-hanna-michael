import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from "../../../services/shared.service.client";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  username: String;
  password: String;
  verifyPassword: String;
  userName: String;
  errorMsg: String;
  errorFlag: boolean;

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { }

  ngOnInit() {
    this.errorFlag = false;
  }

  registerNewUser(username, password, verifyPassword) {
    if (password === verifyPassword) {
      this.userService.register(username, password)
        .subscribe((user) => {
          this.sharedService.user = user;
          this.router.navigate(['/user']);
        });
    } else {
      this.errorMsg = 'passwords do not match!';
      this.errorFlag = true;
    }
  }
    // this.userService.findUserByUsername(username)
    //   .subscribe((user2: User) => {
    //   if (user2 === null) {
    //     if (password === verifyPassword) {
    //       this.username = username;
    //       this.password = password;
    //       const newUser = {
    //         username: this.username,
    //         password: this.password
    //       }
    //       this.userService.createUser(newUser)
    //         .subscribe((userFromServer) => {
    //           this.router.navigate(['user/', userFromServer._id]);
    //         });
    //       // return this.userService.createUser(new User(
    //       //   this.userName, this.password, email, firstName, lastName))
    //       //   .subscribe((user1: User) => {
    //       //     this.router.navigate(['user/', user1._id]);
    //       //   });
    //      } else {
    //       this.errorMsg = 'passwords do not match';
    //       this.errorFlag = true;
    //     }
    //   } else {
    //     this.errorMsg = 'pick a new username';
    //     this.errorFlag = true;
    //   }
    //   });
    //
    //   }

}
