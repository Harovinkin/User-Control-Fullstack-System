const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration) // Registratuon
router.post('/login', userController.login) // Autorization
router.get('/auth', authMiddleware, userController.check) // Check user authorization by JWT
router.get('/', checkRole(2), userController.getAll)
router.get('/:id', userController.getOne)
router.put('/:id', checkRole(2), userController.changeOne),
router.delete('/:id', checkRole(2), userController.remove)

module.exports = router