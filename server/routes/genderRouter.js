const Router = require('express')
const genderController = require('../controllers/genderController')
const router = new Router()

router.post('/', genderController.create)
router.get('/', genderController.getAll) 

module.exports = router