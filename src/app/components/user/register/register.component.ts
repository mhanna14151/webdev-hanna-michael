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
    // if (this.userService.findUserByUsername(username) != null) {
    //   // do nothing...
    // }
    if (password === verifyPassword) {
        console.log('Passwords match');
        this.user = this.userService.createUser(new User(Math.random().toString(),
          this.userName, this.password, email, firstName, lastName));
      const user = this.userService.findUserByCredentials(username, password);
      console.log('USER IS: ' + user);
      if (this.userService.findUserByUsername(this.userName) != null) {
        console.log('USER IS NOT NULL');
        this.router.navigate(['user/', user._id]);
      }
    }
  }

}
