const http = require('http');
const Router = require('./lib/router.js');

const PORT = process.env.PORT || 3000;
const router = new Router();


require('./route/user-route.js')(router); //this is dependency injection
// const userRoute = require('./route/user-route.js')
// userRoute(router) //requiring a function and running it right away

const server = http.createServer(router.route()); //route is a function of rou

server.listen(PORT, function() {
  console.log('listening on port: ' + PORT);
});
