'use strict';

const uuid = require('node-uuid');

const Book = function(title, author){
  if (!title) throw new Error('title expected');
  if (!author) throw new Error('author expected');
  this.id = uuid.v4();
  this.title = title;
  this.author = author;
};

module.exports = Book;
