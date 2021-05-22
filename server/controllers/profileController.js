const {Profile} = require('../models/models')
const ApiError = require('../errors/ApiError')

class ProfileController {

  // Create

  async create(req, res, next) {
    try {
      const {name, genderId, birhdate, city} = req.body
      const {userId} = req.query
    
      const profile = await Profile.create({name, genderId, birhdate, city, userId})

      return res.json(profile)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

  // Get All / Get by User ID

  async getAll(req, res) {
    try {
      const {userId} = req.query
      if (userId) {
        const profiles = await Profile.findAll({where: {userId}})
        return res.json(profiles)
      }
  
      const profiles = await Profile.findAll()
      return res.json(profiles)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

  // Change

  async changeOne(req, res, next) {
    try {
      const {id} = req.params
      const changed = await Profile.update({...req.body}, {where: {id}})
      return res.json(changed)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }

  // Remove

  async remove(req, res) {
    try {
      const {id} = req.params
      const profile = await Profile.destroy({where: {id}})
      return res.json(profile)
    } catch (e) {
      next(ApiError.badRequest(e.massage))
    }
  }
}

module.exports = new ProfileController()