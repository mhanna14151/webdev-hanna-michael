var User = require('../model/user.model.server');
// var one = '1808085995928478';
// var two = '1808085995928478a49bf8d852b9e1b3a1a4df36b255184e4';
// var three = 'http://localhost:3100/api/facebook/oauth2callback';


module.exports = function(app) {
  var userModel = require("../../models/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var bcrypt = require("bcrypt-nodejs");
  var FacebookStrategy = require('passport-facebook').Strategy;

  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
  };

  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  passport.serializeUser(serializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  passport.deserializeUser(deserializeUser);

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(function (user) {
          "use strict";
          done(null, user);
        },
        function (err) {
          "use strict";
          done(err, null);
        }
      );
  }

  passport.use(new LocalStrategy(localStrategy));

  function localStrategy(username, password, done) {
    userModel
      .findUserByUserName(username)
      .then(function (user) {
        if(user && bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  }

  function facebookStrategy(token, refreshToken,
                            profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(function(user) {
        if(user) {
          return done(null, user);
        } else { // if not, insert into db using profile info
          var names = profile.displayName.split(" ");
          var newFacebookUser = {
            lastName:  names[1],
            firstName: names[0],
            email:     profile.emails ? profile.emails[0].value:"",
            facebook: { id:    profile.id, token: token }
          };
          return userModel.createUser(newFacebookUser);
        }
      })
      .then(
        function(user){
          return done(null, user);
        }
      );
  }

  app.get("/api/user/:uid", findUserById);
  app.put("/api/user/:uid", updateUser);
  app.delete("/api/user/:uid", deleteUser);
  app.get("/api/user", findUsers); // find users by user names, credentials, or all users.
  app.post("/api/user", createUser);
  app.post('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);
  app.get ('/api/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get ('/api/facebook/oauth2callback', passport.authenticate('facebook', {
      successRedirect: '../../user',
      failureRedirect: '../../login'
    }));



  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function register(req, res) {
    "use strict";
    var newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password);
    userModel
      .createUser(newUser)
      .then(function(user) {
        req.login(user, function(err) {
          res.json(user);
        });
      });
  }

  function login(req, res) {
    res.json(req.user);
  }

  function loggedIn(req, res) {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }


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
      var promise = userModel
        .findUserByCredentials(username, password);
      promise.then(function(user) {
        res.json(user);
      });
      return;
    }
    // findUserByUserName
    else if (username) {
      var promise = userModel
        .findUserByUserName(username);
      promise.then(function (user) {
        res.json(user)
      });
      return;
    }
    var promise = userModel
      .findAllUsers();
    promise.then(function(users) {
      "use strict";
      res.json(users)
    });
    res.json(users);
  }

  function findUserById(req, res) {
    var userId = req.params["uid"];
    var promise = userModel
      .findUserById(userId);
    promise.then(function(user) {
      "use strict";
      res.json(user)
    });
    // var user = users.find(function (user) {
    //   "use strict";
    //   return user._id === userId
    // });
    // res.json(user);
  }

  function updateUser(req, res) {
    var userId = req.params['uid'];
    var newUser = req.body;
    userModel.updateUser(userId, newUser)
      .then(function (status) {
        res.send(status);
        //   });
        // for (var i = 0; i < users.length; i++) {
        //   if (users[i]._id === userId) {
        //     users[i] = newUser;
        //     res.json(users);
        //     return;
        //   }
        // }
      });
  }

  function deleteUser(req, res) {
    var userId = req.params['uid'];
    userModel.deleteUser(userId)
      .then(function(status) {
        "use strict";
        res.send(status);
      });
    //
    // for (var i = 0; i < users.length; i++) {
    //   if (users[i]._id === userId) {
    //     users.splice(i, 1);
    //     res.json(users);
    //     return;
    //   }
    // }
  }

  function createUser(req, res) {
    var newUser = req.body;
    userModel
      .createUser(newUser)
      .then(function(user) {
        res.json(user);
      })
    // var newUser = new User(user.username, user.password, user.email, user.firstName, user.lastName);
    // users.push(newUser);
    // res.json(newUser);
  }

};




// var users = [
//   new User("123", "alice", "alice", "alice@wonderland.com", "Alice", "Wonder"),
//   new User("234", "bob", "bob", "bobmarley@burgers.com", "Bob", "Marley"),
//   new User("345", "charly", "charly", "charlys@angels.com", "Charly", "Garcia"),
//   new User("456", "jannunzi", "jannunzi", "jannunzi@webdev.com", "Jose", "Annunzi")
// ];
