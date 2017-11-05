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

  baseUrl = environment.baseUrl;

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'updateUser' : this.updateUser,
    // 'deleteUser' : this.deleteUser
  };

  createUser(user: User) {
    const num: Number = (Math.floor(1 + (1000 - 1) * Math.random()));
    const url = this.baseUrl + '/api/user';
    // if (this.findUserByUsername(user.username) === null) {
    return this._http.post(url, user)
      .map((response: Response) => {
        return response.json();
      });
    // }
    // user._id = num.toString();
    // this.users.push(user);
    // return user;
  }

  findUserById(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        });
  }

  findUserByUsername(user_name: String) {
    const url = this.baseUrl + '/api/user?username=' + user_name;
    return this._http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        });
  }

  // Currently assumes usernames are unique
  findUserByCredentials(username: String, password: String) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this._http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        });
  }

  // Come back and check this
  updateUser(userId, user) {
    const newUser = new User(user.username, user.password, user.email, user.firstName, user.lastName);
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.put(url, newUser)
      .map((response: Response) => {
        return response.json();
      });
    // for (let x = 0; x < this.users.length; x++) {
    //   if (this.users[x]._id === userId) {
    //     this.users[x] = user;
    //   }
    // }
  }

  // COME BACK AND IMPLEMENT
  deleteUser(userId) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.delete(url)
      .map(
        (response: Response) => {
          return response.json();
        });
  }

}
