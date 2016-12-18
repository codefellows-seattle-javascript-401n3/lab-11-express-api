'use strict';

const uuid = require('node-uuid');

module.exports = function(note, content) {
  if(!note) throw Error('note expected.');
  if(!content) throw Error('content expected.');
  this.id = uuid.v1();
  this.note = note;
  this.content = content;
};
