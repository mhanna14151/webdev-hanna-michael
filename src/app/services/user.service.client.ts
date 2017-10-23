import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {User} from '../models/user.model.client';

// injecting service into module
@Injectable()

export class UserService {

  constructor(private _http: Http) { }
    users: User[] = [
      new User('123', 'alice', 'alice', 'alice@wonderland.com', 'Alice', 'Wonder'),
      new User('234', 'bob', 'bob', 'bobmarley@burgers.com', 'Bob', 'Marley'),
      new User('345', 'charly', 'charly', 'charlys@angels.com', 'Charly', 'Garcia'),
      new User('456', 'jannunzi', 'jannunzi', 'jannunzi@webdev.com', 'Jose', 'Annunzi')
  ];


  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };

  createUser(user: User) {
    const num: Number = (Math.floor(1 + (1000 - 1) * Math.random()));
    user._id = num.toString();
    this.users.push(user);
    return user;
  }
  //
  //
  //
  // // (Math.floor(1 + (1000 - 1) * Math.random())
  // createUser(user) {
  //   user = new User (Math.random(), this.userName, password, email, firstName, lastName);
  //   this.users.push(user);
  //   return user;
  // }

  findUserById(userId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {  return this.users[x]; }
    }
  }

  findUserByUsername(user_name: String) {
    for (let x = 0; this.users.length; x++) {
      if (this.users[x].username === user_name) {
        return this.users[x];
      }
    }
  }

  // Currently assumes usernames are unique
  findUserByCredentials(username: String, password: String) {
    const user = this.findUserByUsername(username);
    if (user.password === password) {
      return user;
    }
  }

  // Come back and check this
  updateUser(userId, user) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        this.users[x] = user;
      }
    }
  }

  deleteUser(userId) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        delete this.users[x];
      }
    }
  }

}
