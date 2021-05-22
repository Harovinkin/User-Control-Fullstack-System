const Router = require('express')
const genderController = require('../controllers/genderController')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', checkRole(2), genderController.create)
router.get('/', checkRole(2), genderController.getAll) 

module.exports = router