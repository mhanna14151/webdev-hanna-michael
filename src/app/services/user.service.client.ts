import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class UserService {

  constructor(private _http: Http) { }

  users = [
    {_id: '123',
      username: 'alice',
      password: 'alice',
      email: 'alice@wonderland.com',
      firstName: 'Alice',
      lastName: 'Wonder'},
    {_id: '234',
      username: 'bob',
      password: 'bob',
      email: 'bobmarley@burgers.com',
      firstName: 'Bob',
      lastName: 'Marley'},
    {_id: '345',
      username: 'charly',
      password: 'charly',
      email: 'charlys@angels.com',
      firstName: 'Charly',
      lastName: 'Garcia'},
    {_id: '456',
      username: 'jannunzi',
      password: 'jannunzi',
      email: 'jannunzi@webdev.com',
      firstName: 'Jose',
      lastName: 'Annunzi'}
  ];

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };

  createUser(user: any) {
    user._id = Math.random();
    this.users.push(user);
    return user;
  }

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
