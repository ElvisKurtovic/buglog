import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async createBug(rawBug) {
    const bug = await dbContext.Bug.create(rawBug)
    return bug
  }

  async find(query = {}) {
    const bug = await dbContext.Bug.find(query).populate('creator')
    return bug
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async deleteBug(id) {
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id }, { closed: true })
    return bug
  }

  async editBug(id, editedBug) {
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id, closed: false }, editedBug)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }
}

export const bugsService = new BugsService()
