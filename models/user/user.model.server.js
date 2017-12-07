var mongoose = require('mongoose');
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);
UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUserName = findUserByUserName;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByFacebookId = findUserByFacebookId;

module.exports = UserModel;

function createUser(user) {
  return UserModel.create(user);
}

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function findAllUsers() {
  return UserModel.find();
}

function findUserById(userId) {
  return UserModel.findOne({_id: userId});
}

function findUserByUserName(username) {
  return UserModel.findOne({username: username});

}

function findUserByFacebookId(facebookId) {
  return UserModel.findOne({'facebook.id': facebookId});
}


function updateUser(userId, user) {
  return UserModel.updateOne({_id: userId}, user);
}

function deleteUser(userId) {
  return UserModel.deleteOne({_id: userId});
}
