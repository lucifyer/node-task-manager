const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager'

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })