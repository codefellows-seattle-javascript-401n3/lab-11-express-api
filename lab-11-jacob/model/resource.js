const uuid = require('node-uuid');
const createError = require('http-errors');

const User = function(username) {
  if(!username) throw createError(400, 'include username');
  this.id = 'user_' + uuid.v4();
  this.date = new Date().toLocaleString();
  this.username = username;
};

module.exports = User;
