const mongoose = require('mongoose')
const Schema =  mongoose.Schema
const {hashPassword} = require('../helpers')

var userSchema = new Schema({
    username : {
        type: String,
        required: [true, 'Must Containt Username']
    },
    password : {
        type: String,
        require: [true, 'Must Containt Password'],
        minlength: [8, 'Password Must have 8 words']
    },
    email : {
        type: String,
        validate: [{
            validator: v => {
                return /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(v)
            },
            message: 'Invalid Email Format'
        }],
        require: [true, 'Must Containt Email']
    },
    created_at : {
        type: Date,
        default: new Date()
    }
})

userSchema.pre('save',function (next) {
    this.password = hashPassword(this.password)

    User.findOne({email: this.email})
        .then(user => {
            if(user && this._id != user._id) {
                next('Email Already been used')
            }
            next()
        })
        .catch(err => {
            next(err)
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User