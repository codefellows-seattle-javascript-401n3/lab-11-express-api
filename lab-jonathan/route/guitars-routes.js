let storage = require('../lib/storage.js');
let response = require('../lib/response.js');
let Guitar = require('../model/guitars.js');
let url = require('url');


module.exports = function(router) {
  // router.get('/api/guitars', (req, res) => {
  //   // console.log('Boomstick');
  //   storage.fetchAll()
  //   .then(guitar => {
  //     console.log('guitar:' , guitar);
  //     res.json(guitar);
  //   });
  // });
  // router.get('/api/guitars', function(req, res) {
  //   // if(req.url.query) {
  //     storage.fetchItem(req.url.query)
  //     console.log('query' , req.url.query)
  //     .then(guitar => {
  //       console.log('then guitar', guitar);
  //       res.sendJSON(res, 200, guitar);
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       response.sendText(res, 404, 'Not Found');
  //     });
  //     // return;
  //   // }
  //   response.sendText(res, 400, 'Bad Request');
  // });

  router.get('/api/guitars/:id', (req, res) => {
    console.log('running the get ID');
    console.log('req.params.id: ' , req.params.id);
    storage.fetchItem(req.params.id)
    .then(guitar => {
      res.json(guitar);
    });
    // res.write('the response is: ', JSON.stringify(res));
  });

  // router.get('/api/guitars/:id', (req, res) => {
  //   console.log('boogers');
  //   // let urlParse = url.parse(req.url);
  //   console.log(req.params.id);
  //   if(req.params.id) {
  //     storage.fetchItem(req.params.id);
  //     res.status(200).json(res);
  //     console.log("res: " , res);
  //     // .then(guitar => {
  //     // })
  //     // .catch(err => {
  //     //   res.sendText(res ,404, 'Not Found');
  //     // });
  //     return;
  //   }
  //   res.sendText(res, 400, 'Bad Request');
  // });

  router.post('/api/guitars', function(req, res) {
    try{
      let axe = new Guitar(req.body.make, req.body.model);
      storage.createItem(axe);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(axe));
      res.end();
    }
    catch(err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('Bad Request');
      res.end();
    }
  });

  router.put('/api/guitars/:id', function(req, res) {
    if(req.params.id) {
      storage.updateItem('guitar', req.params.id, req.body.make, req.body.model)
      .then(guitar => {
        res.json(guitar);
      })
      .catch(err => {
        response.sendText(res, 404, 'Not Found');
      });
      return;
    }
    response.sendText(res, 400, 'Bad Request');
  });

  router.delete('/api/guitars/:id', function(req, res){
    if(req.params.id) {
      storage.deleteItem(req.params.id)
      .then(() => {
        response.sendText(res, 200, 'deleted the file');
      })
      .catch(err => {
        response.sendText(res, 404, 'Not Found');
      });
      return;
    }
    response.sendText(res, 400, 'Bad Request');
  });
};
