'use strict';

const express = require('express');

const router = module.exports = new express.Router();

router.use(function(err, req, res) {
  if (err) {
    res.status(500).end(err.message);
  }
});
