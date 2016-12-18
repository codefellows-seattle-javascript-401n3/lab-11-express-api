'use strict';

const parsedUrl = require('../lib/parse-url');
const parsedBody = require('../lib/parse-body');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

['get', 'post', 'put', 'delete'].forEach(verb => {
  Router.prototype[verb] = function(endpoint, callback) {
    this.routes[verb.toUpperCase()][endpoint] = callback;
  };
});

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all( [parsedUrl(req), parsedBody(req)] )
      .then( () => {
        if (typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }

        console.error('route not found');
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('bad request');
        res.end();
      });
  };
};
