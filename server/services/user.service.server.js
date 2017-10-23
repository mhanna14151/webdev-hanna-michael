// import {Injectable} from '@angular/core';
// import {Http, Response} from '@angular/http';
// import 'rxjs/Rx';
// import {environment} from '../../environments/environment';
//
// // injecting Http service into UserService
// @Injectable()
//
// export class UserService {
//
//
//
//
//   constructor(private _http: Http) {}
//   users: User[] = [
//     new User('123', 'alice', 'alice', 'alice@wonderland.com', 'Alice', 'Wonder'),
//     new User('234', 'bob', 'bob', 'bobmarley@burgers.com', 'Bob', 'Marley'),
//     new User('345', 'charly', 'charly', 'charlys@angels.com', 'Charly', 'Garcia'),
//     new User('456', 'jannunzi', 'jannunzi', 'jannunzi@webdev.com', 'Jose', 'Annunzi')
//   ];
//
//
//   module.exports = function (app) {
//
//     baseUrl = environment.baseUrl;
//
//     findAllUsers(req, res) {
//       users: User[] = [
//         new User('123', 'alice', 'alice', 'alice@wonderland.com', 'Alice', 'Wonder'),
//         new User('234', 'bob', 'bob', 'bobmarley@burgers.com', 'Bob', 'Marley'),
//         new User('345', 'charly', 'charly', 'charlys@angels.com', 'Charly', 'Garcia'),
//         new User('456', 'jannunzi', 'jannunzi', 'jannunzi@webdev.com', 'Jose', 'Annunzi')
//       ];
//
//
//       return this._http.get(this.baseUrl + '/api/user/' + userId)
//         .map(
//           (res: Response) => {
//             const data = res.json();
//             return data;
//           });
//     }
//
//   }
//
// }

var User = require('../model/user.model.server')

module.exports = function(app) {

  var users = [
    new User('123', 'alice', 'alice', 'alice@wonderland.com', 'Alice', 'Wonder'),
    new User('234', 'bob', 'bob', 'bobmarley@burgers.com', 'Bob', 'Marley'),
    new User('345', 'charly', 'charly', 'charlys@angels.com', 'Charly', 'Garcia'),
    new User('456', 'jannunzi', 'jannunzi', 'jannunzi@webdev.com', 'Jose', 'Annunzi')
  ];

  app.get("/api/user/:uid", findUserById);
  app.get("/api/user", findAllUsers);

  function findAllUsers(req, res) {
    res.json(users);
  }

  function findUserById(req, res) {
    var userId = req.params["uid"];
    var user = users.find(function (user) {
      "use strict";
      return user._id === userId
    });
    res.json(user);
  }


};
