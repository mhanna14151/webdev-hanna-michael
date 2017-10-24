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

var User = require('../model/user.model.server');

module.exports = function(app) {

  var users = [
    new User('123', 'alice', 'alice', 'alice@wonderland.com', 'Alice', 'Wonder'),
    new User('234', 'bob', 'bob', 'bobmarley@burgers.com', 'Bob', 'Marley'),
    new User('345', 'charly', 'charly', 'charlys@angels.com', 'Charly', 'Garcia'),
    new User('456', 'jannunzi', 'jannunzi', 'jannunzi@webdev.com', 'Jose', 'Annunzi')
  ];

  app.get("/api/user/:uid", findUserById);
  // app.get("/api/user?username=username&password=password", findUserByCredentials);
  // app.get("/api/user?username=username", findUserByUsername);
  app.put("/api/user/:uid", updateUser);
  app.delete("/api/user/:uid", deleteUser);
  app.get("/api/user", findUsers); // find users by user names, credentials, or all users.
  app.post("/api/user", createUser);


  /**
   * Returns a different set of users based on conditions.
   * @param req
   * @param res
   */
  function findUsers(req, res) {
    console.log('FIND USERS');
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password) {
      var user = users.find(function (user) {
        "use strict";
        return user.username === username && user.password === password;}
      );
      if (user) {
        res.json(user);
      } else {
        res.json({});
      }
      return;
    }
    else if (username) {
      var user = users.find(function (user) {
        "use strict";
        return user.username === username;}
      );
      if (user) {
        res.json(user);
      } else {
        res.json({});
      }
      return;
    }
    res.json(users);
  }

  function findUserById(req, res) {
    console.log('FIND USER BY ID');
    var userId = req.params["uid"];
    var user = users.find(function (user) {
      "use strict";
      return user._id === userId
    });
    res.json(user);
  }

  function findUserByUsername(req, res) {
    var username = req.params['username'];
    console.log('USERNAME' + username);
    var user = users.find(function (user) {
      "use strict"
      return user.username = username;
    });
    res.json(user);
  }


  // function findUserByCredentials(req, res) {
  //   var userId = req.params["uid"];
  //   var user = users.find(function (user) {
  //     "use strict";
  //     return user._id === userId
  //   });
  //   res.json(user);
  // }

  function createUser(req, res) {
    "use strict";

  }

  function updateUser(req, res) {
    // /api/user/:uid"
    var userId = req.params['uid']
    var newUser = req.body;
    console.log('users are: ' + users);
    console.log('UPDATE UPDATE UPDATE' + newUser);
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i] = newUser;
        res.json(users);
        return;
      }
    }
  }


  function deleteUser(req, res) {
    var userId = req.params['uid']
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users.splice(i, 1);
        var users = findUsers(req, res);
        res.json(users);
        return;
      }
    }
  }

  function createUser(req, res) {
    "use strict";

  }


};
