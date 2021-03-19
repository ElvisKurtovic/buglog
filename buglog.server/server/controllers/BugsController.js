import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getOne)
      .post('', this.createBug)
      .delete('/:id', this.deleteBug)
      .put('/:id', this.editBug)
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      res.status(201).send(bug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      const bug = await bugsService.deleteBug(req.params.id)
      res.status(201).send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.query.creatorId = req.userInfo.id
      res.send(await bugsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      delete req.body.closed
      req.query.creatorId = req.userInfo.id
      const bug = await bugsService.editBug(req.params.id, req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
