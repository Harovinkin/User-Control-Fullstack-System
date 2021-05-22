const {Role} = require('../models/models')
const ApiError = require('../errors/ApiError')

class RoleController {
  async create(req, res, next) {
    try {
      const {name} = req.body
      const role = await Role.create({name})
      return res.json(role)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

  async getAll(req, res, next) {
    try {
      const roles = await Role.findAll()
      return res.json(roles)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }
}

module.exports = new RoleController()