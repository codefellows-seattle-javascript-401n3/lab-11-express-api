const storage = require('../lib/storage.js');
const User = require('../model/resource.js');
let jsonParser = require('body-parser').json();

module.exports = function(router) {
  router.get('/api/users/:id', function(req, res) {
    if (req.params.id) {
      storage.fetchItem('users', req.params.id)
      .then(user => {
        if(!user) {
          console.error('not found');
          res.status(404).end('not found');
        } else {
          res.end(JSON.stringify(user));
        }
      });
      return;
    }
    res.status(400).end('bad request');
  });

  router.put('/api/users/:id', jsonParser, (req, res) => {
    if (!req.params.id) {
      res.writeHead(400, {'Content-Type': 'text/plain',
      });
      res.write('include user id');
      res.end();
      return;
    }
    if (req.params.id) {
      storage.fetchItem('users', req.params.id)
      .then(data => {
        if(!data.username) {
          res.status(400).end('INVALID JSON');
        } else {
          data.username = req.body.username;
          res.json(req.body);
          storage.updateItem(data);
          res.end();
        }
      })
        .catch(err => {
          console.error(err);
          res.status(404).end('not found');
          res.end();
        });
      return;
    }
  });

  router.post('/api/users', jsonParser, function(req, res) {
    if (Object.keys(req.body).length === 0) {
      res.writeHead(400, {'Content-Type': 'text/plain',
      });
      res.write('include body');
      res.end();
      return;
    }
    if (!req.body.username) {  //if username is given as a property of the body
      res.status(400).end('INVALID JSON');
    } else {
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
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write('Bad request');
        res.end();
      }
    }
  });

  router.delete('/api/users/:id', function(req, res) {
    storage.deleteUser('users', req.params.id)
    .then(() => {
      res.writeHead(204, {
        'Content-Type': 'text/plain',
      });
      res.end('success');
    })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.end('invalid user');
      });
  });
};
