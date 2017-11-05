var mongoose = require('mongoose');
var PageSchema = require("./page.schema.server");
var PageModel = mongoose.model("PageModel", PageSchema);
UserModel.findUserById = findUserById;
UserModel.createUser = createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByCredentials = findUserByCredentials;

module.exports = PageModel;

//
// function findUserByCredentials(username, password) {
//   UserModel.find({username: username, password: password},
//     function(err, user) {
//       console.log(user);
//     });
// }
//
//
// function createUser(user) {
//   UserModel.create(user, function(err, doc) {
//     console.log(err);
//     console.log(doc);
//   });
// }
//
//
// function findAllUsers() {
//   UserModel.find(function(err, docs) {
//     console.log(docs);
//   });
// }
//
// function findUserById(userId) {
//   UserModel.findById(userId, function(err, docs) {
//     console.log(docs);
//   });
// }
