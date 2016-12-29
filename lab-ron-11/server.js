const Note = require('./model/note.js')
const storage = require('./lib/storage.js')
const express = require('express')
const bodyParser = require('body-parser').json()
const morgan = require('morgan')

const router = express.Router()
const app = express()

const PORT = process.env.PORT || 3000

//app.use(morgan('dev'))
app.use(bodyParser)

require('./route/note-route.js')(router)
app.use(router)

app.listen(PORT, function() {
  console.log('listening on port', PORT);
})
