'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})
const createError = require('http-errors')

module.exports = exports = {}

exports.createItem = function(note, content) {
  if (!note) return Promise.reject(createError(400, 'expected note'))
  if (!content) return Promise.reject(createError(400, 'expected content'))

  let json = JSON.stringify(content)
  return fs.writeFileProm(`${__dirname}/../data/note/${content.id}.json`, json)
  .then(() =>  { console.log('created a new item')})
  .catch( err => Promise.reject(createError(500, err.message)))
}

exports.fetchAll = function(note) {
  if (!note) return Promise.reject(new Error('expected note'))
  return fs.readdirProm(`${__dirname}/../data/note`)
  .then(data => data.map( str => str.replace('.json', '')))
  .catch(err => Promise.reject(err))
}


exports.fetchItem = function(note, id) {
  if(!note) return Promise.reject(createError(400, 'expected note'))
  if(!id) return Promise.reject(createError(400, 'expected id'))

  return fs.readFileProm(`${__dirname}/../data/note/${id}.json`)
  .then(data => {
    try{
      let content = JSON.parse(data.toString())
      return content
    } catch (err){
      return Promise.reject(createError(500, err.message))
    }
  })
  .catch(err => Promise.reject(createError(400, err.message)))
}

exports.deleteItem = function(note, id) {
  return new Promise((resolve, reject) => {

    if(!note) return reject(createError(400, 'expected note'))
    if(!id) return reject(createError(400, 'expected id'))

    return fs.unlinkProm(`${__dirname}/../data/note/${id}.json`)
    .then( () => {console.log('successfully deleted: ' + id)})
    .catch( (err) => Promise.reject(createError(404, err.message))
  )
  })
}
