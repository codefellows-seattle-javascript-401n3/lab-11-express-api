'use strict';

const express = require('express');

const StatSnapshot = require('../model/statsnapshot');

const router = new express.Router();

router.get('/statshots', function(req, res, next) {
  StatSnapshot.find()
  .then(statshots => res.json(statshots))
  .catch(next);
});

router.get('/statshots/:id', function(req, res, next) {
  StatSnapshot.findById(req.params.id)
  .then(function(statshot) {
    if (statshot) {
      res.json(statshot);
    } else {
      next(new Error('Invalid ID given.'));
    }
  })
  .catch(next);
});

router.post('/statshots', function(req, res, next) {
  new StatSnapshot(req.body).save()
  .then(statshot => res.json(statshot))
  .catch(next);
});

router.put('/statshots', function(req, res, next) {
  StatSnapshot.findById(req.body.id)
  .then(function(stat) {
    if (!stat) {
      next(new Error('Invalid ID given.'));
    }
    stat.username = req.body.username;
    stat.stats = req.body.stats;
    stat.save().then(res.json(stat));
  }).catch(next);
});

router.delete('/statshots/:id', function(req, res, next) {
  StatSnapshot.remove({ _id: req.params.id }).then(res.status(204).end()).catch(next);
});

module.exports = router;
