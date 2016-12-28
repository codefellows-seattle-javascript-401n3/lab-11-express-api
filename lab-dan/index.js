'use strict'

const PORT = process.env.PORT || 3000

const Express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = Express()
const router = Express.Router()
const storage = require('./model/storage')

require('./routes/dog-routes')(router, storage)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(router)

// init server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

// for testing purposes
module.exports = app
