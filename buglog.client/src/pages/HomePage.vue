<template>
  <div class="container">
    <button class="btn btn-success mx-auto" @click="sortBugs">
      Filter By Open Bugs
    </button>
    <button class="btn btn-danger ml-1" @click="sortBugz">
      Filter By Closed Bugs
    </button>
    <div class="row text-center">
      <div class="col" v-if="state.user.isAuthenticated">
        <form class="form-inline" @submit.prevent="createBug">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control"
              placeholder="Title"
              aria-describedby="helpId"
              v-model="state.newBug.title"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              name="description"
              id="description"
              class="form-control"
              placeholder="Description"
              aria-describedby="helpId"
              v-model="state.newBug.description"
            />
          </div>
          <button class="btn btn-primary" type="submit">
            Create New Bug
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Bug v-for="bugData in state.bugs"
             :key="bugData.id"
             :bug="bugData"
        >
        </bug>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { bugsService } from '../services/BugsService'
// import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      sortedBugs: computed(() => AppState.bugs.filter(bug => bug.closed === false)),
      sortedBugz: computed(() => AppState.bugs.filter(bug => bug.closed === true)),
      newBug: {}
    })
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      state,
      sortBugz() {
        AppState.bugs = state.sortedBugz
      },
      sortBugs() {
        AppState.bugs = state.sortedBugs
      },
      async createBug() {
        try {
          state.newBug.creator = state.user
          state.newBug.creatorId = state.user.id
          const bugId = await bugsService.createBug(state.newBug)
          // state.activeBug.user = state.user
          router.push({ name: 'BugDetailsPage', params: { id: bugId } })
          state.newBug = {}
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
