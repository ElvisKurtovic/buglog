<template>
  <div class="container">
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
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      newBug: {}
    })
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      state,
      async createBug() {
        await bugsService.createBug(state.newBug)
        state.newBug = {}
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
