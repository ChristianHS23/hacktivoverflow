var router = require('express').Router()
const {checkLogin, checkQuestion} = require('../middlewares')
const {QuestionController} = require('../controllers')


router.get('/', QuestionController.getAll)

router.use(checkLogin)
router.post('/', QuestionController.create)
router.get('/user', QuestionController.getAllUserQuestion)
router.put('/vote/:questionId', QuestionController.vote)
router.put('/:questionId', checkQuestion, QuestionController.edit)
router.delete('/:questionId', checkQuestion, QuestionController.delete)

module.exports = router