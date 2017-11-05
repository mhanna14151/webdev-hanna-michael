var mongoose = require('mongoose');
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);
UserModel.findUserById = findUserById;
UserModel.createUser = createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByCredentials = findUserByCredentials;

module.exports = UserModel;

function findUserByCredentials(username, password) {
  UserModel.find({username: username, password: password},
    function(err, user) {
    console.log(user);
    });
}


function createUser(user) {
  UserModel.create(user, function(err, doc) {
  console.log(err);
  console.log(doc);
  });
}


function findAllUsers() {
  UserModel.find(function(err, docs) {
    console.log(docs);
  });
}

function findUserById(userId) {
  UserModel.findById(userId, function(err, docs) {
    console.log(docs);
  });
}
