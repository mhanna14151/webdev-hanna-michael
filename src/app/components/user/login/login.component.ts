import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';

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


  constructor(private router: Router, private userService: UserService) { }

  login(username: String, password: String) {
    const user = this.userService.findUserByCredentials(username, password);
    if (user != null) {
      this.router.navigate(['user/', user._id]);
    }
    this.errorFlag = true;
    this.errorMsg = 'Username and/or password is incorrect';
  }

  ngOnInit() {
  }

}
