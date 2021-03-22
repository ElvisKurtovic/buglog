import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class BugsService {
  async getNotes(id) {
    try {
      const res = await api.get('api/bugs/' + id + '/notes')
      AppState.notes = res.data
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async getBug(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBug(id) {
    try {
      await api.delete('api/bugs/' + id)
      this.getBug(id)
    } catch (error) {
      console.error(error)
    }
  }

  async createBug(rawBug) {
    try {
      await api.post('api/bugs', rawBug)
      this.getBugs()
    } catch (error) {
      console.error(error)
    }
  }

  async createNote(rawNote) {
    try {
      const res = await api.post('api/notes', rawNote)
      AppState.notes.push(res.data)
      // this.getNotes()
    } catch (error) {
      console.error(error)
    }
  }

  async deleteNote(id) {
    try {
      await api.delete('api/notes/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}
export const bugsService = new BugsService()
