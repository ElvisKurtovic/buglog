<template>
  <div class="Note card mt-1" v-if="note.creator">
    <br>
    <div class="card-body">
      <p>{{ note.body }}</p>
      <p>-{{ note.creator.email }} <span class="float-right"><img src="https://s.gravatar.com/avatar/0db53901eca1472a8997a38a24b38d06?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png" alt=""></span></p>
      <button type="button" class="btn btn-outline-danger mt-1" v-if="note.creator.email == state.user.email" @click="deleteNote">
        Delete Note
      </button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
export default {
  name: 'Note',
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      async deleteNote() {
        if (window.confirm('You sure bro?')) {
          await bugsService.deleteNote(props.note.id, props.note.bug)
          await bugsService.getNotes(route.params.id)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.comment{
  cursor: pointer
}
</style>
