import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';


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

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.errorFlag = false;
  }

  registerNewUser(username, password, verifyPassword) {
    this.userService.findUserByUsername(username)
      .subscribe((user2: User) => {
      if (user2 === null) {
        if (password === verifyPassword) {
          this.username = username;
          this.password = password;
          const newUser = new User(this.username, this.password, null, null, null);
          this.userService.createUser(newUser)
            .subscribe((userFromServer) => {
              this.router.navigate(['user/', userFromServer._id]);
            });
          // return this.userService.createUser(new User(
          //   this.userName, this.password, email, firstName, lastName))
          //   .subscribe((user1: User) => {
          //     this.router.navigate(['user/', user1._id]);
          //   });
         } else {
          this.errorMsg = 'passwords do not match';
          this.errorFlag = true;
        }
      } else {
        this.errorMsg = 'pick a new username';
        this.errorFlag = true;
      }
      });

      }

}
