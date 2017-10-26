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
  password: String;
  verifyPassword: String;
  userName: String;
  errorMsg: String;
  errorFlag: boolean;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.errorFlag = false;
  }

  registerNewUser(username, password, verifyPassword,
                  email, firstName, lastName) {
    this.userService.findUserByUsername(username)
      .subscribe((user2: User) => {
      if (user2 === null) {
        if (password === verifyPassword) {
          return this.userService.createUser(new User(Math.random().toString(),
            this.userName, this.password, email, firstName, lastName))
            .subscribe((user1: User) => {
              this.router.navigate(['user/', user1._id]);
            });
        }
      } else {
        this.errorMsg = 'pick a new username';
        this.errorFlag = true;
      }
      });

      }

}
