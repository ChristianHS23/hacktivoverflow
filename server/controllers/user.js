const {User} = require('../models')
const {comparePassword} = require('../helpers')
const jwt = require('jsonwebtoken')

class UserController  {
    static register(req, res) {
        let {username , password, email} = req.body
        User.create({username, password, email})
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            if(err) {
                res.status(400).json({msg : err})
            } else {
                res.status(500).json({
                    msg : 'Internal Server Error'
                })
            }
        })
    }

    static login(req, res) {
        let {email, password} = req.body
        User.findOne({email})
        .then(user => {
            if(user) {
                if(comparePassword(password, user.password)) {
                    let token = jwt.sign({
                        _id: user._id
                    },`${process.env.JWT_SECRET}`)
                    res.json({token})
                } else {
                    res.status(400).json({
                        msg : "Email or Password wrong"
                    })
                }
            } else {
                res.status(400).json({
                    msg : "Email or Password wrong"
                })
            }
        })
        .catch(err => {
            if(err) {
                res.status(400).json({msg : err})
            } else {
                res.status(500).json({
                    msg : 'Internal Server Error'
                })
            }
        })
    }
}

module.exports = UserController