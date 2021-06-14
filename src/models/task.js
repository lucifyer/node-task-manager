const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: Number,
        default: 2,
        validate(value) {
            if(value < 0 || value > 6) {
                throw new Error('Priority has to be between 0 to 5')
            }
        }
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task