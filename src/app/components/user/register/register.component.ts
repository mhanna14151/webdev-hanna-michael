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

  // registerNewUser(username, password, verifyPassword,
  //                 email, firstName, lastName) {
  //   if (password === verifyPassword) {
  //
  //
  //     // this.userService.createUser(new User(null, username, password, email, firstName, lastName))
  //     //   .subscribe((user) => {
  //     //   this.user = user;
  //     //   });
  //     // // //
  //     // // this.user = this.userService.createUser(new User(Math.random().toString(),
  //     // //   this.userName, this.password, email, firstName, lastName));
  //     // // const user = this.userService.findUserByCredentials(username, password);
  //     // if (this.userService.findUserByUsername(username) != null) {
  //     //   this.router.navigate(['user/', user._id]);
  //     // }
  //   }
  // }

  // OLD CODE THAT WASN'T WORKING BECAUSE OF user._id not being recognized.
  registerNewUser(username, password, verifyPassword,
                  email, firstName, lastName) {
    if (password === verifyPassword) {
      return this.userService.createUser(new User(Math.random().toString(),
        this.userName, this.password, email, firstName, lastName))
        .subscribe((user1: User) => {
          this.router.navigate(['user/', user1._id]);
        });
    }
      // const user = this.userService.findUserByCredentials(username, password);
    //   this.userService.findUserByUsername(this.userName)
    //     .subscribe((user1: User) => {
    //       this.router.navigate(['user/', user1._id]);
    //     });
    // }
  }

}
