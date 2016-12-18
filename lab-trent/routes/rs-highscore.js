'use strict';

const express = require('express');
const http = require('http');
const createError = require('http-errors')

const StatSnapshot = require('./model/statsnapshot');
const resourceManager = require('./lib/resourcemanager');

const router = express.Router();

const SKILL_NAMES = ['Overall', 'Attack', 'Defence', 'Strength', 'Constitution', 'Ranged', 'Prayer', 'Magic', 'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming', 'Runecrafting', 'Hunter', 'Construction', 'Summoning', 'Dungeoneering', 'Divination', 'Invention'];

router.get('/', function(req, res) {
  res.json(resourceManager.getResourceIdList());
});

router.post('/:username', function(req, res) {
  http.get('http://services.runescape.com/m=hiscore/index_lite.ws?player=' + req.params.username, function(httpRes) {
    let body = '';

    httpRes.on('data', function(chunk) {
      body += chunk;
    });

    httpRes.on('end', function() {
      if (body.includes('DOCTYPE')) {
        throw createError(400, 'no player found by that name');
      } else {
        let statBlocks = body.split('\n');
        let stats = [];
        for (let i = 0;i < statBlocks.length;i++) {
          if (i >= SKILL_NAMES.length)
            break;
          let statRanks = statBlocks[i].split(',');
          stats[i] = {
            skillName: SKILL_NAMES[i],
            rank: parseInt(statRanks[0]),
            level: parseInt(statRanks[1]),
            xp: parseInt(statRanks[2]),
          };
        }
        let snapshot = new StatSnapshot(req.params.username, stats);
        resourceManager.add(snapshot);
        res.json(snapshot);
      }
    });
  }).on('error', function(e) {
    console.log('Error getting item details', e);
  });
});

router.put('/:id', function(req, res) {
  resourceManager.getResource(req.params.id, function(err, data) {
    if (err) throw createError(400, err.message);
    if (data) {
      data.username = req.body.username;
      data.stats = req.body.stats;
      resourceManager.addResource(data, function(err) {
        if (err) throw createError(400, err.message);
        res.status(201).json({url:'rs/' + req.params.id});
      });
    }
  });
});

router.delete('/:id', function(req, res) {
  resourceManager.delete(req.params.id, function(err) {
    if (err) throw createError(400, err.message);
    res.status(200).end();
  });
});

module.exports = router;
