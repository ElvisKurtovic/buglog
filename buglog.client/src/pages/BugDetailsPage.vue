<template>
  <div class="BugDetailsPage">
    <div class="bug col card mt-1">
      <div class="card-body">
        <h4 class="card-title">
          {{ state.bug.title }}
        </h4>
        <p>{{ state.bug.description }}</p>
        <p>Updated On: {{ Date(state.bug.updatedAt) }}</p>
        <p>Updated On: {{ state.bug.updatedAt.split('T')[0] }}</p>
        <p v-if="state.bug.creator">
          -{{ state.bug.creator.email }}
        </p>
        <p><img src="https://s.gravatar.com/avatar/0db53901eca1472a8997a38a24b38d06?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png" alt=""></p>
        <br>
        <p v-if="state.bug.closed == true" class="text-danger">
          CLOSED
        </p>
        <p v-if="state.bug.closed == false" class="text-success">
          OPEN
        </p>
      </div>

      <div class="z-2">
        <i class="fas fa-trash float-right text-danger" aria-hidden="true" @click="deleteBug"></i>
      </div>
    </div>
    <Note class="bug" v-for="noteData in state.notes" :key="noteData.id" :note="noteData">
    </note>
    <form class="form-inline mt-1" @submit.prevent="createNote">
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

// import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse'

// import { listsService } from '../services/ListsService'
export default {
  name: 'BugDetailsPage',

  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    // Vue.use(VueFilterDateParse)
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
        if (window.confirm('You sure bro?')) {
          await bugsService.deleteBug(state.bug.id)
          state.activeBug = {}
        }
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
    .bug:hover {
  // transform: translateY(-5px);
  box-shadow: 1px 3px 5px rgb(94, 94, 94);
  // cursor: pointer
}
.bug {
  transition: all .2s;
  color: black
}
    .btncolor{
      background-color: magenta;
    }
    </style>
