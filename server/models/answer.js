var mongoose = require('mongoose')
var Schema = mongoose.Schema
const Question = require('./question')

var answerSchema = new Schema({
    description : {
        type: String,
        required: [true, 'Answer Must Containt Description']
    },
    voters : [{
        userid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            },
        status : ''
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    created_at : {
        type: Date,
        default: new Date()
    }
})

answerSchema.pre('save', function(next) {
    Question.findOne({_id: this.question})
    .then(questionData => {
        if(questionData) {
            let validasi = questionData.answers.filter(e => e._id.toString() === this._id.toString())
            if(validasi.length) {
                next()
            } else {
                questionData.answers.push(this._id)
                questionData.save()
                next()
            }
        } else {
            next('Question Not Found')
        }
    })
    .catch(err => {
        next(err)
    })
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer