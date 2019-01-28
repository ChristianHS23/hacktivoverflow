var router = require('express').Router()
const {checkLogin, checkAnswer} = require('../middlewares')
const {AnswerController} = require('../controllers')

router.use(checkLogin)
router.get('/', AnswerController.getAll)
router.put('/:answerid', checkAnswer, AnswerController.edit)
router.put('/vote/:answerId', AnswerController.vote)
router.post('/:question', AnswerController.create)

module.exports = router