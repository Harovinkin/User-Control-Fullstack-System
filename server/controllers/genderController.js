const {Gender} = require('../models/models')
const ApiError = require('../errors/ApiError')

class GenderController {
  async create(req, res, next) {
    try {
      const {name} = req.body
      const gender = await Gender.create({name})
      return res.json(gender)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

  async getAll(req, res, next) {
    try {
      const genders = await Gender.findAll()
      return res.json(genders)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }
}

module.exports = new GenderController()