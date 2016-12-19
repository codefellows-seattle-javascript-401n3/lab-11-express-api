'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
// const storage = require('../lib/storage.js');

const Song = module.exports = function(title, artist){
  if (!title) throw createError(400, 'title expected');
  if (!artist) throw createError(400, 'artist expected');
  this.id = uuid.v1();
  this.title = title;
  this.artist = artist;
};

module.exports = Song;
