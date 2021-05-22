const ApiError = require('../errors/ApiError')
const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = ({id, email, roleId}) => {
  return jwt.sign(
    {id, email, roleId},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {

  // Registration

  async registration(req, res, next) {
    try {
      const {email, password, roleId} = req.body
      if (!email || !password) {
        return next(ApiError.badRequest('Uncorrect e-mail or password'))
      }
  
      const candidate = await User.findOne({where: {email}})
      if (candidate) {
        return next(ApiError.badRequest('User with that e-mail already exists'))
      }
  
      const hashPassword = await bcrypt.hash(password, 5)
  
      const user = await User.create({email, roleId, password: hashPassword})
      const token = generateJwt(user)
  
      return res.json({token})
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

  // Login

  async login(req, res, next) {
    try {
      const {email, password} = req.body

      const user = await User.findOne({where: {email}})
      if (!user) {
        return next(ApiError.badRequest('User with that e-mail not exists'))
      }

      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.badRequest('Wrong password!'))
      }

      const token = generateJwt(user)
  
      return res.json({token})
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

  // Check

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user)
      return res.json({token})
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

    // Get One

    async getOne(req, res, next) {
      try {
        const {id} = req.params
        
        const user = await User.findOne({where: {id}})
        return res.json(users)

      } catch (e) {
        next(ApiError.badRequest(e.massage))
      }
    }

  // Get All / Get by Role ID

  async getAll(req, res, next) {
    try {
      const {roleId} = req.query
      if (roleId) {
        const users = await User.findAll({where: {roleId}})
        return res.json(users)
      }

      const users = await User.findAll()
      return res.json(users)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

  // Change

  async changeOne(req, res, next) {
    try {
      const {id} = req.params
      const changed = await User.update({...req.body}, {where: {id}})
      return res.json(changed)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }


  // Remove

  async remove(req, res) {
    try {
      const {id} = req.params
      const user = await User.destroy({where: {id}})
      return res.json(user)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }
}

module.exports = new UserController()