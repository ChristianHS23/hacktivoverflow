const jwt = require('jsonwebtoken')
const {User, Question, Answer} = require('../models')

function checkLogin(req, res, next) {
    let {token} = req.headers
    try {
        if(token) {
            let decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
            User.findById(decoded._id)
                .then(user => {
                    let {_id, email, username} = user
                    req.user = {
                        _id,
                        email,
                        username
                    }
                    next()
                })
        }
    } catch(err) {
        console.log(err)
        res.status(402).json({
            msg: 'Invalid Token'
        })
    }
}

function checkQuestion(req, res, next) {
    let {questionId} = req.params
    let userId = req.user._id
    try {
        Question.findById(questionId)
        .then(question => {
            if(question.author.toString() == userId.toString()) {
                next()
            } else {
                next('You are unauthorized to edit or change this data')
            }
        })
    }catch(err) {
        res.status(402).json({
            msg: 'You are unauthorized to edit or change this data'
        })
    }
}

function checkAnswer(req, res, next) {
    let {answerId} = req.params
    let userId = req.user._id
    try {
        Answer.findById(answerId)
        .then(answer => {
            if(answer.author.toString() == userId.toString()) {
                next()
            } else {
                next('You are unauthorized to edit or change this data')
            }
        })
    }catch(err) {
        res.status(402).json({
            msg: 'You are unauthorized to edit or change this data'
        })
    }
}

module.exports = {checkLogin, checkQuestion, checkAnswer}