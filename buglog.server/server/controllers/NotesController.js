import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.findNotes)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('/:id', this.findNote)
      .post('', this.createNote)
      .delete('/:id', this.deleteNote)
    // .put('/:id', this.editNote)
  }

  async findNotes(req, res, next) {
    try {
      res.send(await notesService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const note = await notesService.createNote(req.body)
      res.status(201).send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await notesService.deleteNote(req.params.id)
      res.status(201).send(note)
    } catch (error) {
      next(error)
    }
  }

  // async findNote(req, res, next) {
  //   try {
  //     req.query.creatorId = req.userInfo.id
  //     res.send(await notesService.findById(req.params.id))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async editNote(req, res, next) {
  //   try {
  //     delete req.body.closed
  //     req.query.creatorId = req.userInfo.id
  //     const note = await notesService.editNote(req.params.id, req.body)
  //     res.send(note)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
