const mongoose = require('mongoose')
const Schema = mongoose.Schema


var questionSchema = new Schema({
    title : {
        type: String,
        required: [true, 'Question Must Contain Title']
    },
    description : {
        type: String,
        required: [true, 'Question Must Contain Description']
    },
    voters : [{
        userid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            },
        status : ''
        }
    ],
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    created_at : {
        type: Date,
        default: new Date()
    }
})

questionSchema.pre('save',function (next) {
    next()
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question