//router is just a way to associate with the verb route combination
const parsePost = require('./body-parser');
const parseUrl = require('./url-parse');

function Router() { //this gets rid of need for lots of if else statements
  this.routes = {
    GET:{},
    POST: {},
    PUT: {},
    DELETE: {},
  };
}

Router.prototype.get = function (endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function (endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function (endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function (endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([ //run all of these promises before anything gets routed.
      parseUrl(req), //this will run if it is a get request
      parsePost(req), //this will run if it is a post request
    ])
    .then(() => {
      if(this.routes[req.method][req.url.pathname]){ //if the property exists on the routes object that is a function...
        this.routes[req.method][req.url.pathname](req, res); //then run the function
        return;
      }
      console.error('route not found');
      res.writeHead(404, {'Content-Type': 'text/plain',
      });
      res.write('not found');
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    });
  };
};

module.exports = Router;
