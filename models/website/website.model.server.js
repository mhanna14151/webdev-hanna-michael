var mongoose = require('mongoose');
var UserSchema = require("./model.schema.server");
var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

// PageModel.findUserById = findUserById;
// PageModel.createUser = createUser;
// PageModel.findAllUsers = findAllUsers;
// PageModel.findUserByCredentials = findUserByCredentials;

module.exports = WebsiteModel;
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
