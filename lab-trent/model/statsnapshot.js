'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let statSnapshotSchema = Schema({
  username: { type: String, required: true },
  stats: [Number],
});

module.exports = mongoose.model('statSnapshot', statSnapshotSchema);
