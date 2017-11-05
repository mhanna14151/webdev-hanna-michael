var User = require('../model/user.model.server');


module.exports = function(app) {

  var userModel = require("../../models/user/user.model.server");

  var users = [
    new User("123", "alice", "alice", "alice@wonderland.com", "Alice", "Wonder"),
    new User("234", "bob", "bob", "bobmarley@burgers.com", "Bob", "Marley"),
    new User("345", "charly", "charly", "charlys@angels.com", "Charly", "Garcia"),
    new User("456", "jannunzi", "jannunzi", "jannunzi@webdev.com", "Jose", "Annunzi")
  ];



  app.get("/api/user/:uid", findUserById);
  app.put("/api/user/:uid", updateUser);
  app.delete("/api/user/:uid", deleteUser);
  app.get("/api/user", findUsers); // find users by user names, credentials, or all users.
  app.post("/api/user", createUser);


  /**
   * Returns a different set of users based on conditions.
   * -- findUserByCredentials -> Used for login
   * -- findUserByUserName -> Used to Check if a user is already registered
   * -- findAllUsers -> Adminstrative Purposes
   */
  function findUsers(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    // findUserByCredentials
    if (username && password) {
      userModel.findUserByCredentials(username, password);
      res.json({});
      return;



      // var user = users.find(function (user) {
      //   "use strict";
      //   return user.username === username && user.password === password;}
      // );
      // if (user) {
      //   res.json(user);
      // } else {
      //   res.json(null);
      // }
      // return;
    }
    // findUserByUserName
    else if (username) {
      var user = users.find(function (user) {
        "use strict";
        return user.username === username;}
      );
      if (user) {
        res.json(user);
      } else {
        res.json(null);
      }
      return;
    }
    //findAllUsers
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

  function updateUser(req, res) {
    var userId = req.params['uid'];
    var newUser = req.body;
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i] = newUser;
        res.json(users);
        return;
      }
    }
  }

  function deleteUser(req, res) {
    var userId = req.params['uid'];
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users.splice(i, 1);
        res.json(users);
        return;
      }
    }
  }

  function createUser(req, res) {
    const user = req.body;
    var newUser = new User(user._id, user.username, user.password, user.email, user.firstName, user.lastName);
    users.push(newUser);
    res.json(newUser);
  }

};
