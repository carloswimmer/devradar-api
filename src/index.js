const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
require('dotenv/config')

const app = express()

const { DB_NAME, DB_PASS, DB_CLUSTER, API_PORT } = process.env

mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASS}@${DB_CLUSTER}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// app.use(cors({ origin: 'http://localhost:3000' }))
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(API_PORT)