const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

User.hasMany(Post, {

});

Post.belongsTo(User, {

});

Comment.belongsTo(User, {

});

User.hasMany(Comment, {

});

Comment.belongsTo(Post, {

});

Post.hasMany(Comment, {

});

module.exports = { User, Post, Comment };