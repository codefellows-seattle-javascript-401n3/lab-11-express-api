const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const User = require('../model/resource.js');
let jsonParser = require('body-parser').json();

module.exports = function(router) {
  router.get('/api/users', function(req, res) {
    if (req.query.id) {
      storage.fetchItem('users', req.query.id)
      .then(user => {
        response.sendJSON(res, 200, user);
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.put('/api/users', jsonParser, (req, res) => {
    if (!req.body) {
      res.writeHead(400, {'Content-Type': 'text/plain',
      });
      res.write('include body');
      res.end();
      return;
    }
    if (req.query.id) {
      storage.fetchItem('users', req.query.id)
      .then(data => {
        console.log(data);
        data.username = req.body.username;
        storage.updateItem(data);
        res.end();
      })
        .catch(err => {
          console.error(err);
          response.sendText(res, 404, 'not found');
          res.end();
        });
      return;
    }
  });

  router.post('/api/users', jsonParser, function(req, res) {
    if (!req.body) {
      res.writeHead(400, {'Content-Type': 'text/plain',
      });
      res.write('include body');
      res.end();
      return;
    }
    try {
      var user = new User(req.body.username);
      storage.createItem('users', user);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(user));
      res.end();
    } catch (err) {
      console.error(err);
      res.writehead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('you can\'t post that smut!');
      res.end();
    }
  });

  router.delete('/api/users', function(req, res) {
    try {
      var user = (req.query.id);
      storage.deleteUser('users', user);
      res.writeHead(204, {
        'Content-Type': 'text/plain',
      });
      res.end(); //normally I would log 'user deleted' or something.
    } catch (err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('delete failed');
      res.end();
    }
  });
};
