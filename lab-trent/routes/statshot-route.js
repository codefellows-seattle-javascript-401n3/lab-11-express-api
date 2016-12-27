'use strict';

const express = require('express');
const createError = require('http-errors');

const StatSnapshot = require('../model/statsnapshot');

const router = new express.Router();

router.get('/statshots', function(req, res) {
  res.json(resourceManager.getResourceIdList());
});

router.get('/statshots/:id', function(req, res) {
  resourceManager.getResource(req.params.id, function(err, data) {
    if (err) throw createError(404, err.message);
    res.json(data);
  });
});

router.post('/statshots', function(req, res) {
  let snapshot = new StatSnapshot(req.body.username, req.body.stats);
  resourceManager.addResource(snapshot, function(err) {
    if (err) throw createError(500, err.message);
    res.json(snapshot);
  });
});

router.put('/statshots/:id', function(req, res) {
  if (!req.body.username || !req.body.stats) throw createError(400, 'expected username and stats');
  resourceManager.getResource(req.params.id, function(err, data) {
    if (err) throw createError(400, err.message);
    if (data) {
      data.username = req.body.username;
      data.stats = req.body.stats;
      resourceManager.addResource(data, function(err) {
        if (err) throw createError(400, err.message);
        res.status(200).json(data);
      });
    }
  });
});

router.delete('/statshots/:id', function(req, res) {
  resourceManager.delete(req.params.id, function(err) {
    if (err) throw createError(400, err.message);
    res.status(200).end();
  });
});

module.exports = router;
