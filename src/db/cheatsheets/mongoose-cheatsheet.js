const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager'

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// 1. CREATING SIMPLE MODELS
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const sample = new User({
//     name:  'Randy',
//     age: 25
// })

// sample.save().then((response) => {
//     console.log(sample)
// }).catch((error) => {
//     console.log('Error:', error)
// })

// 2. USE SCHEMA

// const taskSchema = new Schema({
//     description: String,
//     completed: Boolean,
//     priority: Number
// })

// const Task = mongoose.model('Task', taskSchema)

// const sampleTask = new Task({
//     description: 'Study',
//     completed: false,
//     priority: 3,
// })

// sampleTask.save().then((response) => {
//     console.log('Saved', sampleTask)
// }).catch((error) => {
//     console.log('Error', error)
// })

// 3. VALIDATION

const taskSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Priority cannot be negative')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    }
})

const Task = mongoose.model('Task', taskSchema)

// const sampleTask = new Task({ description: 'tata', priority: -4})
const sampleTask = new Task({ description: 'tata', priority: 4, email: '  asd@asd.asd  '})

sampleTask.save().then((response) => {
    console.log('Saved', sampleTask)
}).catch((error) => {
    console.log('Error', error)
})



