<template>
  <div class="movie-sessions">
    <row-container
      v-for="(session, index) in sessions"
      :key="index"
      :title="new Date(session.showdate).toDateString()"
      :items="session.daytime.split(';')"
      v-slot="{item: time}"
    >
      <div
        class="time"
        @click="bookTickets(id, session.showdate, time)"
      >
        {{ time }}
      </div>
    </row-container>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import rowContainer from '@/components/row-container.vue'

  const store  = useStore()
  const route  = useRoute()
  const router = useRouter()

  const id = route.params?.id
  store.dispatch('fetchSessions')
  const sessions = computed(() => store.state.sessions[id])

  function bookTickets(id, showdate, daytime) {
    router.push({name: 'book', query: {id, showdate, daytime}})
  }
</script>

<style lang="scss" scoped>
.movie-sessions {
  .time {
    background: $bg-800;
    text-align: center;
    padding: .5rem 0;
    cursor: pointer;
    
    &:hover {
      color: #000;
      background: $bg-100;
    }
  }
}
</style>
  