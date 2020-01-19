const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

const routes = require('./routes')
const { setupWebsocket } = require('./websocket')
require('dotenv/config')

const app = express()
const server = http.Server(app)
const { DB_NAME, DB_PASS, DB_CLUSTER, API_PORT } = process.env

setupWebsocket(server)

mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASS}@${DB_CLUSTER}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// app.use(cors({ origin: 'http://localhost:3000' }))
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(API_PORT)