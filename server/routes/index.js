const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const profileRouter = require('./profileRouter')
const roleRouter = require('./roleRouter')
const genderRouter = require('./genderRouter')


router.use('/user', userRouter)
router.use('/profile', profileRouter)
router.use('/role', roleRouter)
router.use('/gender', genderRouter)

module.exports = router