'use strict';

const express = require('express');
const http = require('http');

const StatSnapshot = require('../model/statsnapshot');
const resourceManager = require('../lib/resourcemanager');

const router = express.Router();

const SKILL_NAMES = ['Overall', 'Attack', 'Defence', 'Strength', 'Constitution', 'Ranged', 'Prayer', 'Magic', 'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming', 'Runecrafting', 'Hunter', 'Construction', 'Summoning', 'Dungeoneering', 'Divination', 'Invention'];

router.post('/:username', function(req, res) {
  http.get('http://services.runescape.com/m=hiscore/index_lite.ws?player=' + req.params.username, function(httpRes) {
    let body = '';

    httpRes.on('data', function(chunk) {
      body += chunk;
    });

    httpRes.on('end', function() {
      if (body.includes('DOCTYPE')) {
        res.end('No stats found for player.');
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

        resourceManager.add(new StatSnapshot(req.params.username, stats));
      }
    });
  }).on('error', function(e) {
    console.log('Error getting item details', e);
  });
});

module.exports = router;
