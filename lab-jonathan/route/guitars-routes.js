let storage = require('../lib/storage.js');
let Guitar = require('../model/guitars.js');
let url = require('url');


module.exports = function(router) {

//NOTE: I've removed the 'fetchAll' function becuase it wasn't in the requirements and having it in there failed my 400 test for no ID provided since when you run fetchAll you're not providing an ID.
  // router.get('/api/guitars', (req, res) => {
  //   storage.fetchAll(req.params.id)
  //   .then(guitar => {
  //     res.json(guitar);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     res.status(404).send('not found');
  //   });
  //   return;
  // });

  router.get('/api/guitars/:id', (req, res) => {
    console.log('running the get ID');
    console.log('req.params.id: ' , req.params.id);
    storage.fetchItem(req.params.id)
    .then(guitar => {
      res.json(guitar);
    })
    .catch(err => {
      console.error(err);
      res.status(404).send('not found');
    });
    return;
  });

  router.get('/api/guitars', function(req, res) {
    res.status(400).send('bad request');
  });

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
      storage.updateItem(req.params.id, req.body.make, req.body.model)
      .then(guitar => {
        res.json(guitar);
      })
      .catch(err => {
        res.status(400).send('Bad Request');
      });
      return;
    }
  });


  router.delete('/api/guitars/:id', function(req, res){
    if(req.params.id) {
      storage.deleteItem(req.params.id)
      .then(() => {
        console.log('in delete cb');
        //res.sendText(res, 200, 'deleted the file');
        res.json({msg: 'deleted the file'});
      })
      .catch(err => {
        res.status(204);
        res.json({msg: 'Not Found'});
      });
      return;
    }
    // res.sendText(res, 400, 'Bad Request');
  });
};
