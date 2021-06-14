const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error('Password is weak')
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be positive')
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User