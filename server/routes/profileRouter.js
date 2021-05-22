const Router = require('express')
const profileController = require('../controllers/profileController')
const router = new Router()

router.post('/', profileController.create)
router.get('/', profileController.getAll)
router.put('/:id', profileController.changeOne)
router.delete('/:id', profileController.remove)

module.exports = router