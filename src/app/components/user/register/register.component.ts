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


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  registerNewUser(username, password, verifyPassword,
                  email, firstName, lastName) {
    if (password === verifyPassword) {
        this.user = this.userService.createUser(new User(Math.random().toString(),
          this.userName, this.password, email, firstName, lastName));
      const user = this.userService.findUserByCredentials(username, password);
      if (this.userService.findUserByUsername(this.userName) != null) {
        this.router.navigate(['user/', user._id]);
      }
    }
  }

}
