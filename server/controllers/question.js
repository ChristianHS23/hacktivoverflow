const {Question} = require('../models')

class QuestionController {
    static create(req, res) {
        let author = req.user._id
        let { title, description} = req.body
        Question.create({title, description, author})
        .then(question => {
            res.status(201).json(question)
        })
        .catch(err => {
            console.log(err)
            if(err) {
                res.status(400).json({
                    msg: err
                })
            } else {
                res.status(500).json({
                    msg: 'Internal Server Error'
                })
            }
        })
    }

    static getAll(req, res) {
        Question.find().sort({created_at : 'desc'})
        .populate({
            path: 'answers',
            populate: { path: 'author'}
        })
        .populate('author')
        .then(questions => {
            res.json(questions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static getOne(req, res) {
        let _id = req.params.questionId
        Question.findOne({_id })
        .populate({
            path: 'answers',
            populate: { path: 'author'}
        })
        .populate('author')
        .then(question => {
            console.log(question)
            res.json(question)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static getAllUserQuestion(req, res) {
        let {_id} = req.user
        Question.find({author: _id}).sort({created_at : 'desc'})
        .populate({
            path: 'answers',
            populate: { path: 'author'}
        })
        .populate('author')
        .then(questions => {
            res.json(questions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static edit(req, res) {
        let {questionId} = req.params
        let { title, description} = req.body
        Question.findByIdAndUpdate(questionId, {title, description})
        .then(question => {
            res.json(question)
        })
        .catch(err  => {
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static delete(req, res) {
        let {questionId} = req.params
        Question.deleteOne({ _id: questionId})
        .then(() => {
            res.json({
                msg: 'Success Delete'
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static vote(req, res) {
        let questionId = req.params.questionId
        let userid = req.user._id
        let status = req.body.status
        let voters = {
            userid ,
            status
        }
        Question.findOne({_id: questionId})
        .then(question => {
            if(question.voters.length == 0) {
                question.voters.push(voters)
                question.save()
                res.json({
                    result: question,
                    msg: 'Success vote'
                })
            } else {
                let voter = question.voters.filter(e => {
                    return e.userid.toString() == userid.toString()
                })
                if(voter.length) {
                    question.voters = question.voters.map(vote =>{
                        if(vote.userid.toString() == userid.toString()){
                            return vote = {_id: vote._id, ...voters}
                        } else {
                            return vote
                        }
                    })
                    question.save()
                    res.json({
                        result: question,
                        msg: 'Success vote'
                    })
                } else {
                    question.voters.push(voters)
                    question.save()
                    res.json({
                        result: question,
                        msg: 'Success vote'
                    })
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }


}

module.exports = QuestionController