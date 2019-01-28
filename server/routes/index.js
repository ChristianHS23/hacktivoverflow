var express = require('express');
var router = express.Router();
var userRouter = require('./users')
var questionRouter = require('./question')
var answerRouter = require('./answer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter)
router.use('/question', questionRouter)
router.use('/answer', answerRouter)


module.exports = router;
