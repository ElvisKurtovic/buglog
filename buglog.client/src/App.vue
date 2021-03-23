<template>
  <header>
    <Navbar />
  </header>
  <main class="bugimg">
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
// import moment from 'moment'

// import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse'

export default {
  name: 'App',
  setup() {
    // Vue.filter('formatDate', function(value) {
    //   if (value) {
    //     return moment(String(value)).format('MM/DD/YYYY hh:mm')
    //   }
    // })
    // Vue.use(VueFilterDateParse)
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.bugimg{
  background-image: url(https://www.biographic.com/wp-content/uploads/2019/09/home-of-a-moth-caterpillar.jpg);
  // background-size: 100vh;
  // background-repeat: no-repeat;
  // background-size: contain;
  // height: 100%;
  // height: 100%;
  // background-position: center;
  // background-repeat: no-repeat;
  background-size: contain;
}

</style>
