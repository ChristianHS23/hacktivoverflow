var router = require('express').Router()
const {checkLogin, checkAnswer} = require('../middlewares')
const {AnswerController} = require('../controllers')

router.use(checkLogin)
router.get('/', AnswerController.getAll)
router.get('/:answerId' , AnswerController.getOne)
router.put('/vote/:answerId', AnswerController.vote)
router.put('/:answerId', checkAnswer, AnswerController.edit)
router.post('/:question', AnswerController.create)

module.exports = router