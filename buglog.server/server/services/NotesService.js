import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async createNote(rawNote) {
    const note = await dbContext.Note.create(rawNote)
    return note
  }

  async find(query = {}) {
    const note = await dbContext.Note.find(query).populate('creator')
    return note
  }

  async findById(id) {
    const note = await dbContext.Note.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async deleteNote(id) {
    const note = await dbContext.Note.findOneAndRemove({ _id: id })
    return note
  }

  // async editNote(id, editedNote) {
  //   const note = await dbContext.Note.findOneAndUpdate({ _id: id }, editedNote)
  //   if (!note) {
  //     throw new BadRequest('Invalid Id')
  //   }
  //   return note
  // }
}

export const notesService = new NotesService()
