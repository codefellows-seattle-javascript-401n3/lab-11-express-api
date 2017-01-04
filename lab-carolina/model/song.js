'use strict';

const uuid = require('node-uuid');
// const createError = require('http-errors');
// const storage = require('../lib/storage.js');

const Song = module.exports = function(title, artist){
  if (!title) throw Promise.reject(new Error(400, 'title expected'));
  if (!artist) throw Promise.reject(new Error(400, 'artist expected'));
  this.id = uuid.v1();
  this.title = title;
  this.artist = artist;
};

module.exports = Song;
