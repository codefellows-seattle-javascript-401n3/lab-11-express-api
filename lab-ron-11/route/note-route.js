'use strict';

const storage = require('../lib/storage.js');
const Note = require('../model/note.js');


module.exports = function(router){

  router.get('/api/note', function(req, res) {
    if (req.query.id) {
      storage.fetchItem('note', req.query.id)
      .then(note => {
        res.json(note)
      })
      .catch( err => {
        console.error(err)
        res.status(404).write('error').end()
      })
      return
    } else {
      if(!req.query.id) {
        storage.fetchAll('note')
        .then( note => {
          res.json(note)
        })
        .catch(err => {
          console.error(err)
          res.status(404).write('error').end()
        })
        return
      }
      res.status(400).write('bad request').end()

    }
  })

  router.post('/api/note', function(req, res) {
    try {
      var note = new Note(req.body.note, req.body.content)
      storage.createItem('note', note)
      res.json(note)
    } catch (err) {
      res.json({msg: 'error'})
    }
  })

  router.delete('/api/note', function(req, res){
    console.log('inside the delete function if statement');
    if(req.query.id){
      storage.deleteItem('note', req.query.id)
     .then(() => {
       res.writeHead(204)
       res.end()
     })
     .catch(err => {
       console.error(err)
       res.write('not found')
       res.end()
     })
      return
    }
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write('bad request line63 ')
    res.end()
    // res.status(400).write('error').end()

  })
}
