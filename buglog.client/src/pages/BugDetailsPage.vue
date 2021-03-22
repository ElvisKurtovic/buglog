<template>
  <div class="BugDetailsPage">
    <h1>This is the details page</h1>
    <div class="col card mt-1">
      <div class="card-body">
        <h4 class="card-title">
          {{ state.bug.title }}
        </h4>
        <p>{{ state.bug.description }}</p>
        <p>{{ state.bug.creator.email }}</p>
        <p><img src="https://s.gravatar.com/avatar/0db53901eca1472a8997a38a24b38d06?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png" alt=""></p>
        <br>
        <p>{{ state.bug.closed }}</p>
      </div>

      <div class="z-2">
        <i class="fas fa-trash float-right text-danger" aria-hidden="true" @click="deleteBug"></i>
      </div>
    </div>
    <Note v-for="noteData in state.notes" :key="noteData.id" :note="noteData">
    </note>
    <form class="form-inline" @submit.prevent="createNote">
      <div class="form-group">
        <input
          type="text"
          name="body"
          id="body"
          class="form-control"
          placeholder="Note"
          aria-describedby="helpId"
          v-model="state.newNote.body"
        />
      </div>
      <button class="btn btn-info mt-1" type="submit">
        Post Note
      </button>
    </form>
  </div>
  <!-- <h5>Note Section:</h5> -->
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
// import { listsService } from '../services/ListsService'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    // const router = useRouter()
    const state = reactive({
      bug: computed(() => AppState.activeBug),
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes),
      newNote: {}
      // lists: computed(() => AppState.lists),
      // newList: {}
    })
    onMounted(async() => {
      await bugsService.getBug(route.params.id)
      // await bugsService.getLists(route.params.id)
      await bugsService.getNotes(route.params.id)
    })
    return {
      state,
      route,
      async deleteBug() {
        await bugsService.deleteBug(state.bug.id)
      },
      async createNote() {
        await bugsService.createNote({ bug: state.bug.id, body: state.newNote.body })
        state.newNote = {}
        await bugsService.getNotes(route.params.id)
      // async createList() {
      //   await listsService.createList(route.params.id, state.newList)
      //   state.newList = {}
      // }
      }
    }
  },
  components: {}
}
</script>

    <style lang="scss" scoped>
    .btncolor{
      background-color: magenta;
    }
    </style>
