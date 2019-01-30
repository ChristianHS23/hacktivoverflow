const {Answer} = require('../models')

class AnswerController {
    static create(req, res) {
        let {question} = req.params
        let author = req.user._id
        let { description} = req.body
        Answer.create({ description, question, author})
        .then(answer => {
            res.status(201).json(answer)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static edit(req, res) {
        let {answerId} = req.params
        let { description} = req.body
        Answer.findOneAndUpdate({_id: answerId}, { description})
        .then(answer => {
            res.json(answer)
        })
        .catch(err  => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static getAll(req, res) {
        Answer.find()
        .then(answers => {
            res.json(answers)
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static getOne(req, res) {
        let _id = req.params.answerId
        Answer.findOne({_id })
        .populate('author')
        .then(answer => {
            console.log(answer)
            res.json(answer)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static vote(req, res) {
        let answerId = req.params.answerId
        let userid = req.user._id
        let status = req.body.status
        let voters = {
            userid ,
            status
        }
        Answer.findOne({_id: answerId})
        .then(answer => {
            if(answer.voters.length == 0) {
                answer.voters.push(voters)
                answer.save()
                res.json({
                    result: answer,
                    msg: 'Success vote'
                })
            } else {
                let voter = answer.voters.filter(e => {
                    return e.userid.toString() == userid.toString()
                })
                if(voter.length) {
                    answer.voters = answer.voters.map(vote =>{
                        if(vote.userid.toString() == userid.toString()){
                            return vote = {_id: vote._id, ...voters}
                        } else {
                            return vote
                        }
                    })
                    answer.save()
                    res.json({
                        result: answer,
                        msg: 'Success vote'
                    })
                } else {
                    answer.voters.push(voters)
                    answer.save()
                    res.json({
                        result: answer,
                        msg: 'Success vote'
                    })
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }
}

module.exports = AnswerController