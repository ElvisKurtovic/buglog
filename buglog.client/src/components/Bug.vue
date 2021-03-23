<template>
  <div class="col-4 card mt-1">
    <router-link :to="{name: 'BugDetailsPage', params: { id: bug.id }}">
      <div class="card-body">
        <h4 class="card-title">
          {{ bug.title }}
        </h4>
        <p>{{ bug.description }}</p>
        <p v-if="bug.closed == true" class="text-danger">
          CLOSED
        </p>
        <p v-if="bug.closed == false" class="text-success">
          OPEN
        </p>
      </div>
    </router-link>
    <div class="z-2">
      Click Trash Can To Mark As Closed
      <i class="fas fa-trash float-right text-danger" aria-hidden="true" @click="deleteBug"></i>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
export default {
  name: 'Bug',
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      async deleteBug() {
        if (window.confirm('You sure bro?')) {
          await bugsService.deleteBug(props.bug.id)
          await bugsService.getBugs(route.params.id)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.z-2 {
  z-index: 2;
}
// .bg-darkgrey{
//   background-color: darkgray;
// }
// .text-color{
//   color:ghostwhite !important
// }
</style>
