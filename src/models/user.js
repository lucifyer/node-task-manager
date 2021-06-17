const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

// Like foreign key to have relationships using ref
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'verysecretkey')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// Overriding the inbuilt function so doesn't need to be called explicitly
// JSON.strigify is called when we try to send the user in the response. Which calls this method
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    if (bycrypt.compareSync(password, user.password)) {
        return user
    } else {
        throw new Error('Unable to login')
    }
}

//Hashing the password before saving to DB
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bycrypt.hashSync(this.password, 8)
    }
    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ author: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User