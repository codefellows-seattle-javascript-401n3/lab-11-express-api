'use strict';

const uuid = require('node-uuid');
const createError = require('../lib/create-errors.js')

module.exports = function(note, content) {
  if(!note) throw createError(400, 'note expected.')
  if(!content) throw createError(400, 'content expected.')
  this.id = uuid.v1()
  this.note = note
  this.content = content
};
